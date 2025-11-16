import { defineString, defineSecret } from "firebase-functions/params";

/**
 * Vendasta OAuth configuration
 */
export const VENDASTA_CLIENT_ID = defineString("VENDASTA_CLIENT_ID");
export const VENDASTA_REDIRECT_URI = defineString("VENDASTA_REDIRECT_URI", { default: "https://flaux-site-dev.web.app/vendastaCallback" });
export const APP_BASE_URL = defineString("APP_BASE_URL", { default: "https://flaux-site-dev.web.app" });
export const VENDASTA_API_BASE_URL = defineString("VENDASTA_API_BASE_URL", { default: "https://prod.apigateway.co/" });

export function getVendastaConfig() {
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
