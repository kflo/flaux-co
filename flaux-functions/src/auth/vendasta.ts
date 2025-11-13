import { onRequest } from "firebase-functions/v2/https";
import { db } from "../utils/firebase";
import {
	VENDASTA_CLIENT_ID, VENDASTA_CLIENT_SECRET, VENDASTA_REDIRECT_URI, APP_BASE_URL,
} from "../configs/vendasta";

/**
 * Initiates Vendasta OAuth flow
 * @endpoint /vendastaLogin
 */
export const vendastaLogin = onRequest({
	cors: true,
	region: "us-central1",
}, (req, res) => {
	const state = generateState();
	const authUrl = "https://sso.vendasta.com/oauth/authorize?" +
		`client_id=${VENDASTA_CLIENT_ID.value()}&` +
		`redirect_uri=${VENDASTA_REDIRECT_URI.value()}&` +
		"response_type=code&" +
		"scope=user:read business:read&" +
		`state=${state}`;

	res.redirect(authUrl);
});

/**
 * Handles Vendasta OAuth callback
 * @endpoint /vendastaCallback
 */
export const vendastaCallback = onRequest({
	cors: true,
	region: "us-central1",
	secrets: [VENDASTA_CLIENT_SECRET],
}, async (req, res) => {
	try {
		const { code } = req.query;

		if (!code) {
			res.status(400).json({ error: "Missing authorization code" });
			return;
		}

		// Exchange code for tokens
		const tokens = await exchangeCodeForTokens(code as string);

		// Get user info from Vendasta
		const vendastaUser = await getVendastaUser(tokens.access_token);

		// Create/update user in Firestore
		await createOrUpdateUser(vendastaUser, tokens);

		// Generate session token
		const sessionToken = generateSessionToken(vendastaUser.id);

		// Redirect to your app
		res.redirect(`${APP_BASE_URL.value()}/dashboard?token=${sessionToken}`);
		return;
	} catch (error) {
		console.error("Vendasta callback error:", error);
		res.status(500).json({ error: "Authentication failed" });
		return;
	}
});

/**
 * Logout from Vendasta session
 * @endpoint /vendastaLogout
 */
export const vendastaLogout = onRequest({
	cors: true,
}, async (req, res) => {
	const { sessionToken } = req.body;

	// Invalidate session
	await invalidateSession(sessionToken);

	// Redirect to Vendasta logout
	res.redirect("https://sso.vendasta.com/logout");
});

/**
 * Exchange OAuth code for access tokens
 * @param code - Authorization code from OAuth callback
 * @returns Promise with token response
 */
async function exchangeCodeForTokens(code: string) {
	const response = await fetch("https://sso.vendasta.com/oauth/token", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			grant_type: "authorization_code",
			client_id: VENDASTA_CLIENT_ID.value(),
			client_secret: VENDASTA_CLIENT_SECRET.value(),
			code: code,
			redirect_uri: VENDASTA_REDIRECT_URI.value(),
		}),
	});

	if (!response.ok) {
		throw new Error(`Token exchange failed: ${response.statusText}`);
	}

	return await response.json();
}

/**
 * Get user info from Vendasta API
 * @param accessToken - Access token for Vendasta API
 * @returns Promise with user data
 */
async function getVendastaUser(accessToken: string) {
	const response = await fetch("https://api.vendasta.com/user", {
		headers: { "Authorization": `Bearer ${accessToken}` },
	});

	if (!response.ok) {
		throw new Error(`User fetch failed: ${response.statusText}`);
	}

	return await response.json();
}

/**
 * Create or update user document in Firestore
 * @param vendastaUser - User data from Vendasta API
 * @param tokens - OAuth tokens
 */
async function createOrUpdateUser(vendastaUser: any, tokens: any) {
	const userDoc = {
		vendastaUserId: vendastaUser.id,
		businessId: vendastaUser.business_id,
		email: vendastaUser.email,
		name: vendastaUser.name,
		authProvider: "vendasta",
		accessToken: tokens.access_token,
		refreshToken: tokens.refresh_token,
		lastLogin: new Date(),
		updatedAt: new Date(),
	};

	await db.collection("users").doc(vendastaUser.id).set(userDoc, { merge: true });

	// Also create/update business document if needed
	if (vendastaUser.business) {
		const businessDoc = {
			vendastaBusinessId: vendastaUser.business_id,
			name: vendastaUser.business.name,
			domain: vendastaUser.business.domain,
			updatedAt: new Date(),
		};

		await db.collection("businesses")
			.doc(vendastaUser.business_id)
			.set(businessDoc, { merge: true });
	}
}

/**
 * Generate a secure session token
 * @param userId - User ID for the session
 * @returns Base64 encoded session token
 * @todo Replace with proper JWT implementation in production
 */
function generateSessionToken(userId: string): string {
	const timestamp = Date.now();
	const random = Math.random().toString(36).substring(2);
	return Buffer.from(`${userId}:${timestamp}:${random}`).toString("base64");
}

/**
 * Generate a secure state parameter for OAuth
 * @returns Random state string for CSRF protection
 */
function generateState(): string {
	return Math.random().toString(36).substring(2) +
		Math.random().toString(36).substring(2);
}

/**
 * Invalidate a session token
 * @param sessionToken - Session token to invalidate
 * @todo Implementation: add token to blacklist or remove from active sessions
 */
async function invalidateSession(sessionToken: string) {
	// For now, just log the logout
	console.log(`Session invalidated: ${sessionToken}`);
}
