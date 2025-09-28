/**
 * Environment configuration
 */

export const config = {
	vendasta: {
		clientId: process.env.VENDASTA_CLIENT_ID,
		clientSecret: process.env.VENDASTA_CLIENT_SECRET,
		redirectUri: process.env.VENDASTA_REDIRECT_URI || "https://your-project.web.app/vendastaCallback",
		authUrl: "https://sso.vendasta.com/oauth/authorize",
		tokenUrl: "https://sso.vendasta.com/oauth/token",
		userUrl: "https://api.vendasta.com/user",
		logoutUrl: "https://sso.vendasta.com/logout",
	},
	app: {
		baseUrl: process.env.APP_BASE_URL || "https://your-app.com",
		environment: process.env.NODE_ENV || "development",
	},
	session: {
		maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
	},
};
