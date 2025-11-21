import { onRequest, HttpsError } from "firebase-functions/v2/https";
import { VENDASTA_SERVICE_ACCOUNT_JSON } from "../configs/vendasta-service-account";
import { VendastaServiceAccountTokenManager } from "../auth/vendasta-service-account";
import { db } from "../utils/firebase";
import { VENDASTA_API_BASE_URL } from "../configs/vendasta";

// Configure CORS allowlist for your site(s)
const ALLOWED_ORIGINS = new Set([
	"https://flaux.co",
	"https://www.flaux.co",
	"https://flaux-site-dev.web.app",
//   "http://localhost:4200",
]);

function allowCors(origin: string | undefined, res: any) {
	if (origin && ALLOWED_ORIGINS.has(origin)) {
		res.set("Access-Control-Allow-Origin", origin);
	}
	res.set("Vary", "Origin");
	res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
	res.set("Access-Control-Allow-Headers", "Content-Type");
}

function normalizePhone(input: string | undefined): string | undefined {
	if (!input) return undefined;
	const digits = input.replace(/\D/g, "");
	if (digits.length === 10) return `+1${digits}`; // default to US if 10
	if (digits.startsWith("1") && digits.length === 11) return `+${digits}`;
	if (digits.length > 0) return `+${digits}`; // best-effort E.164
	return undefined;
}

// Vendasta CRM endpoint requires 'customers' scope
const VENDASTA_SCOPES = ["customers"];

export const submitContact = onRequest({
	cors: true,
	region: "us-central1",
	secrets: [VENDASTA_SERVICE_ACCOUNT_JSON],
}, async (req, res) => {
	allowCors(req.headers.origin as string | undefined, res);
	if (req.method === "OPTIONS") {
		res.status(204).end();
		return;
	}

	if (req.method !== "POST") {
		res.status(405).json({ error: "Method not allowed" });
		return;
	}

	try {
		const body = req.body || {};
		const name: string | undefined = body.name?.toString().trim();
		const email: string | undefined = body.email?.toString().trim().toLowerCase();
		const phone: string | undefined = normalizePhone(body.phone?.toString());
		const company: string | undefined = body.company?.toString().trim();
		const description: string | undefined = body.description?.toString().trim();
		const projectType: string[] = Array.isArray(body.projectType) ? body.projectType : [];
		// Budget and timeline would need custom fields configured in Vendasta CRM
		// const budget: string | undefined = body.budget?.toString();
		// const timeline: string | undefined = body.timeline?.toString();

		if (!name || !email) {
			throw new HttpsError("invalid-argument", "Missing required fields: name, email");
		}

		// Acquire Vendasta access token
		const accessToken = await VendastaServiceAccountTokenManager.getToken(VENDASTA_SCOPES);

		// Build CRM payload using Vendasta Contact schema field names
		// Reference: contact-schema.json
		// Try using email as natural lookup field without explicit external_id
		const payload: any = {
			"standard__email": email,
			"standard__first_name": name.split(" ")[0] || name,
			"standard__last_name": name.split(" ").slice(1).join(" ") || "",
		};

		// Add optional fields only if they have values
		if (phone) payload["standard__phone_number"] = phone;
		if (description) payload["standard__contact_message"] = description;
		if (projectType?.length) payload["standard__tags"] = projectType.join(", ");
		if (company) payload["standard__contact_source_name"] = company;

		// Set lead attribution
		payload["standard__contact_source_drill_1"] = "Website Contact Form";
		payload["standard__contact_source_drill_2"] = "flaux.co/contact";

		// Custom fields for budget and timeline would need to be configured in Vendasta first
		// Omitting for now until custom fields are set up in the CRM

		// Create simple idempotency key for the day (for future use with Vendasta idempotency headers)
		// const today = new Date();
		// const dayKey = `${today.getUTCFullYear()}-${today.getUTCMonth()+1}-${today.getUTCDate()}`;
		// const idemKey = cryptoHash(`${email}|${phone}|${dayKey}`);

		const VENDASTA_CONTACTS_URL = `${VENDASTA_API_BASE_URL.value()}/org/8VAK/contacts`;
		console.log(`[submitContact] Calling Vendasta API: ${VENDASTA_CONTACTS_URL}`);
		console.log("[submitContact] Payload:", JSON.stringify(payload, null, 2));

		const resp = await fetch(VENDASTA_CONTACTS_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${accessToken}`,
				// If Vendasta supports idempotency headers, wire here:
				// "Idempotency-Key": idemKey,
			},
			body: JSON.stringify(payload),
		});

		console.log(`[submitContact] Vendasta response status: ${resp.status} ${resp.statusText}`);

		let vendastaResponse: any = null;
		if (resp.status === 401) {
			// Force refresh and retry once
			const refreshed = await VendastaServiceAccountTokenManager.getToken(VENDASTA_SCOPES);
			const retry = await fetch(VENDASTA_CONTACTS_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${refreshed}`,
				},
				body: JSON.stringify(payload),
			});
			if (!retry.ok) {
				const text = await retry.text().catch(() => "");
				throw new HttpsError("unknown", `Vendasta create failed: ${retry.status} ${retry.statusText} ${text}`);
			}
			vendastaResponse = await retry.json();
		} else if (!resp.ok) {
			const text = await resp.text().catch(() => "");
			console.error(`[submitContact] Vendasta API error: ${resp.status} ${resp.statusText}`);
			console.error("[submitContact] Response body:", text);
			throw new HttpsError("unknown", `Vendasta create failed: ${resp.status} ${resp.statusText} ${text}`);
		} else {
			vendastaResponse = await resp.json();
		}

		// Audit record (minimal, PII-light)
		await db.collection("contactSubmissions").add({
			email,
			company: company || null,
			submittedAt: new Date(),
			vendasta: {
				status: "created",
				responseId: vendastaResponse?.id ?? null,
			},
			// tags: projectType,
		});

		console.log(`[submitContact] Successfully created contact, ID: ${vendastaResponse?.id}`);
		res.json({ ok: true, id: vendastaResponse?.id ?? null });
	} catch (e: any) {
		// Log the full error for debugging
		console.error("[submitContact] Error:", e);
		console.error("[submitContact] Error stack:", e.stack);

		// Do not leak internals to client; log separately in real deployments
		const message = e instanceof HttpsError ? e.message : "Submission failed";
		res.status(400).json({ ok: false, error: message });
	}
});

