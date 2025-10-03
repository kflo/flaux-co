/**
 * Modern Firebase parameterized configuration
 * Replaces process.env approach with Firebase runtime params and secrets
 */
import {defineString, defineSecret} from "firebase-functions/params";

/**
 * Deploy-time parameters (non-sensitive)
 */
export const VENDASTA_CLIENT_ID = defineString("VENDASTA_CLIENT_ID");
export const VENDASTA_REDIRECT_URI = defineString("VENDASTA_REDIRECT_URI", {
	default: "https://flaux-site-dev.web.app/vendastaCallback",
});
export const APP_BASE_URL = defineString("APP_BASE_URL", {
	default: "https://flaux-site-dev.web.app",
});

/**
 * Secrets (sensitive credentials stored in Google Secret Manager)
 */
export const VENDASTA_CLIENT_SECRET = defineSecret("VENDASTA_CLIENT_SECRET");

export function getConfig() {
	return {
		vendasta: {
			clientId: VENDASTA_CLIENT_ID.value(),
			clientSecret: VENDASTA_CLIENT_SECRET.value(),
			redirectUri: VENDASTA_REDIRECT_URI.value(),
			authUrl: "https://sso.vendasta.com/oauth/authorize",
			tokenUrl: "https://sso.vendasta.com/oauth/token",
			userUrl: "https://api.vendasta.com/user",
			logoutUrl: "https://sso.vendasta.com/logout",
		},
		app: {
			baseUrl: APP_BASE_URL.value(),
			environment: process.env.NODE_ENV || "development",
		},
		session: {
			maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
		},
	};
}

// Backward compatibility - deprecated, use getConfig() instead
export const config = {
	vendasta: {
		get clientId() {
			return VENDASTA_CLIENT_ID.value();
		},
		get clientSecret() {
			return VENDASTA_CLIENT_SECRET.value();
		},
		get redirectUri() {
			return VENDASTA_REDIRECT_URI.value();
		},
		authUrl: "https://sso.vendasta.com/oauth/authorize",
		tokenUrl: "https://sso.vendasta.com/oauth/token",
		userUrl: "https://api.vendasta.com/user",
		logoutUrl: "https://sso.vendasta.com/logout",
	},
	app: {
		get baseUrl() {
			return APP_BASE_URL.value();
		},
		environment: process.env.NODE_ENV || "development",
	},
	session: {
		maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
	},
};
