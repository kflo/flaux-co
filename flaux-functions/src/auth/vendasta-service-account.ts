import { VENDASTA_SERVICE_ACCOUNT_JSON, VendastaServiceAccount } from "../configs/vendasta-service-account";
import { db } from "../utils/firebase";
import { onRequest, HttpsError } from "firebase-functions/v2/https";
import crypto from "node:crypto";

/* ---------------------------------- TYPES --------------------------------- */

type CachedToken = {
  accessToken: string;
  expiresAt: number; // epoch ms
  scopeKey: string;
};

/* ----------------------------- RUNTIME MEMORY ----------------------------- */

let inMemoryToken: CachedToken | null = null;

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

// Minimal base64url helper
function b64url(input: Buffer | string): string {
	const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
	return buf
		.toString("base64")
		.replace(/=/g, "")
		.replace(/\+/g, "-")
		.replace(/\//g, "_");
}

function isValid(token: CachedToken | null): boolean {
	if (!token) return false;
	// Consider token valid if > 60s remains
	return token.expiresAt - Date.now() > 60_000;
}

function scopeKey(scopes: string[]): string {
	const s = [...scopes].sort().join(" ");
	return crypto.createHash("sha256").update(s).digest("hex");
}

/* -------------------------------------------------------------------------- */
/*                               ASYNC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

async function readServiceAccount(): Promise<VendastaServiceAccount> {
	const raw = await VENDASTA_SERVICE_ACCOUNT_JSON.value();
	try {
		return JSON.parse(raw) as VendastaServiceAccount;
	} catch (e) {
		throw new Error("Invalid VENDASTA_SERVICE_ACCOUNT_JSON secret: not valid JSON");
	}
}

async function readFirestoreToken(key: string): Promise<CachedToken | null> {
	const docRef = db.collection("vendasta").doc("meta").collection("tokens").doc(key);
	const snap = await docRef.get();
	if (!snap.exists) return null;
	const data = snap.data() as any;
	if (!data) return null;
	return {
		accessToken: data.accessToken,
		expiresAt: data.expiresAt,
		scopeKey: key,
	};
}

async function writeFirestoreToken(key: string, token: CachedToken): Promise<void> {
	const docRef = db.collection("vendasta").doc("meta").collection("tokens").doc(key);
	await docRef.set({
		accessToken: token.accessToken,
		expiresAt: token.expiresAt,
		updatedAt: new Date(),
	}, { merge: true });
}

/* -------------------------------------------------------------------------- */
/*                     VendastaServiceAccountTokenManager                     */
/* -------------------------------------------------------------------------- */

export class VendastaServiceAccountTokenManager {
	static async getToken(scopes: string[]): Promise<string> {
		const key = scopeKey(scopes);

		// In-memory fast path
		if (inMemoryToken && inMemoryToken.scopeKey === key && isValid(inMemoryToken)) {
			return inMemoryToken.accessToken;
		}

		// Firestore cache path
		const fsToken = await readFirestoreToken(key);
		if (fsToken && isValid(fsToken)) {
			inMemoryToken = fsToken;
			return fsToken.accessToken;
		}

		// Refresh via JWT assertion
		const token = await this.issueNewToken(scopes);
		inMemoryToken = { ...token, scopeKey: key };
		await writeFirestoreToken(key, inMemoryToken);
		return inMemoryToken.accessToken;
	}

	private static async issueNewToken(scopes: string[]): Promise<{accessToken: string; expiresAt: number}> {
		const sa = await readServiceAccount();

		if (sa.assertionHeaderData.alg !== "RS256") {
			throw new Error(`Unsupported alg ${sa.assertionHeaderData.alg}; expected RS256`);
		}

		const now = Math.floor(Date.now() / 1000);
		const exp = now + 9 * 60; // 9 minutes

		const header = {
			alg: sa.assertionHeaderData.alg,
			kid: sa.assertionHeaderData.kid,
			typ: "JWT",
		};

		const payload = {
			aud: sa.assertionPayloadData.aud,
			iss: sa.assertionPayloadData.iss,
			sub: sa.assertionPayloadData.sub,
			iat: now,
			exp,
			scope: scopes.sort().join(" "),
		};

		const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;
		const signer = crypto.createSign("RSA-SHA256");
		signer.update(unsigned);
		const signature = signer.sign(sa.private_key);
		const jwt = `${unsigned}.${b64url(signature)}`;

		const form = new URLSearchParams();
		form.set("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
		form.set("assertion", jwt);

		const resp = await fetch(sa.token_uri, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: form,
		});

		if (!resp.ok) {
			const text = await resp.text().catch(() => "");
			throw new HttpsError("unauthenticated", `Token exchange failed: ${resp.status} ${resp.statusText} ${text}`);
		}
		const json = await resp.json() as { access_token: string; expires_in?: number };
		const expiresIn = (json.expires_in ?? 600) * 1000; // ms
		const expiresAt = Date.now() + expiresIn;
		return { accessToken: json.access_token, expiresAt };
	}
}

/* -------------------------------------------------------------------------- */
/*                                  ENDPOINTS                                 */
/* -------------------------------------------------------------------------- */

// Optional lightweight health endpoint to confirm SA config is loadable (no token request)
export const vendastaSaConfigHealth = onRequest({
	cors: true,
	secrets: [VENDASTA_SERVICE_ACCOUNT_JSON],
}, async (_req, res) => {
	try {
		const sa = await readServiceAccount();
		res.json({ ok: true, client_email: sa.client_email, token_uri: sa.token_uri });
	} catch (e: any) {
		res.status(500).json({ ok: false, error: String(e?.message || e) });
	}
});

