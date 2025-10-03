import {onRequest} from "firebase-functions/v2/https";
import {createPresignedUploadUrl, createPresignedDownloadUrl} from "../utils/r2";
import {R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY} from "../configs/r2";

// Simple auth placeholder; replace with real auth/session validation
function validateApiKey(req: any): boolean {
	const headerKey = req.get("x-api-key");
	const expected = process.env.INTERNAL_API_KEY;
	return !!expected && headerKey === expected;
}

export const generateR2UploadUrl = onRequest({
	cors: true,
	secrets: [R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY],
}, async (req, res) => {
	if (req.method !== "POST") {
		res.status(405).json({error: "Method not allowed"});
		return;
	}
	if (!validateApiKey(req)) {
		res.status(401).json({error: "Unauthorized"});
		return;
	}

	try {
		const {key, contentType} = req.body || {};
		if (!key) {
			res.status(400).json({error: "Missing key"});
			return;
		}
		const url = await createPresignedUploadUrl(key, 900, contentType);
		res.json({uploadUrl: url, key});
	} catch (e: any) {
		console.error("generateR2UploadUrl error", e);
		res.status(500).json({error: "Failed to generate upload URL"});
	}
});

export const generateR2DownloadUrl = onRequest({
	cors: true,
	secrets: [R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY],
}, async (req, res) => {
	if (req.method !== "GET") {
		res.status(405).json({error: "Method not allowed"});
		return;
	}
	if (!validateApiKey(req)) {
		res.status(401).json({error: "Unauthorized"});
		return;
	}

	try {
		const key = req.query.key as string;
		if (!key) {
			res.status(400).json({error: "Missing key"});
			return;
		}
		const url = await createPresignedDownloadUrl(key, 300);
		res.json({downloadUrl: url, key});
	} catch (e: any) {
		console.error("generateR2DownloadUrl error", e);
		res.status(500).json({error: "Failed to generate download URL"});
	}
});
