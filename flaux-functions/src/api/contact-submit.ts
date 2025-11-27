import { onRequest, HttpsError } from "firebase-functions/v2/https";
import cors from "cors";
import { VENDASTA_SERVICE_ACCOUNT_JSON } from "../configs/vendasta-service-account";
import { db } from "../utils/firebase";

// Configure CORS with allowed origins
const corsHandler = cors({
	origin: (origin, callback) => {
		const allowedOrigins = [
			"https://flaux.co",
			"https://www.flaux.co",
			"https://flaux-site-dev.web.app",
		];

		// Allow localhost for development
		if (origin?.startsWith("http://localhost")) {
			callback(null, true);
		} else if (allowedOrigins.includes(origin || "")) {
			callback(null, true);
		} else {
			callback(new Error("CORS not allowed"), false);
		}
	},
	methods: ["POST", "OPTIONS"],
	allowedHeaders: ["Content-Type"],
});

function normalizePhone(input: string | undefined): string | undefined {
	if (!input) return undefined;
	const digits = input.replace(/\D/g, "");
	if (digits.length === 10) return `+1${digits}`; // default to US if 10
	if (digits.startsWith("1") && digits.length === 11) return `+${digits}`;
	if (digits.length > 0) return `+${digits}`; // best-effort E.164
	return undefined;
}

export const submitContact = onRequest({
	region: "us-central1",
	secrets: [VENDASTA_SERVICE_ACCOUNT_JSON],
}, (req, res) => {
	// Apply CORS middleware
	corsHandler(req, res, async () => {
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
			const contactId = crypto.randomUUID();
			const firstName: string | undefined = body.firstName?.toString().trim();
			const lastName: string | undefined = body.lastName?.toString().trim();
			const email: string | undefined = body.email?.toString().trim().toLowerCase();
			const phone: string | undefined = normalizePhone(body.phone?.toString());
			const company: string | undefined = body.company?.toString().trim();
			const budget: string | undefined = body.budget?.toString().trim();
			const timeline: string | undefined = body.timeline?.toString().trim();
			const preferredContact: string | undefined = body.preferredContact?.toString().trim();
			const description: string | undefined = body.description?.toString().trim();
			const projectType: string[] = Array.isArray(body.projectType) ? body.projectType : [];

			if (!firstName || !lastName || !email) {
				throw new HttpsError("invalid-argument", "Missing required fields: firstName, lastName, email");
			}

			// Construct payload for Webhook
			const payload: any = {
				contactId,
				firstName,
				lastName,
				email,
				phone,
				company,
				budget,
				timeline,
				preferredContact,
				description,
				projectType: projectType.join(", "),
				source: "flaux.co/contact",
			};

			const WEBHOOK_URL = "https://automations.businessapp.io/start/8VAK/d2f040b7-0e63-4884-b765-b3e8bbcf558b";
			console.log(`[submitContact] Calling Webhook: ${WEBHOOK_URL}`);
			console.log("[submitContact] Payload:", JSON.stringify(payload, null, 2));

			const resp = await fetch(WEBHOOK_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			console.log(`[submitContact] Webhook response status: ${resp.status} ${resp.statusText}`);

			if (!resp.ok) {
				const text = await resp.text().catch(() => "");
				console.error(`[submitContact] Webhook error: ${resp.status} ${resp.statusText}`);
				console.error("[submitContact] Response body:", text);
				throw new HttpsError("unknown", `Webhook failed: ${resp.status} ${resp.statusText}`);
			}

			// Audit record (minimal, PII-light)
			await db.collection("contactSubmissions").add({
				email,
				company: company || null,
				submittedAt: new Date(),
				status: "forwarded_to_webhook",
			});

			console.log("[submitContact] Successfully forwarded contact to webhook");
			res.json({ ok: true });
		} catch (e: any) {
		// Log the full error for debugging
			console.error("[submitContact] Error:", e);
			console.error("[submitContact] Error stack:", e.stack);

			// Do not leak internals to client; log separately in real deployments
			const message = e instanceof HttpsError ? e.message : "Submission failed";
			res.status(400).json({ ok: false, error: message });
		}
	});
});

