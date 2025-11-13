/**
 * User management API endpoints
 */

import { onRequest } from "firebase-functions/v2/https";
import { fetchUser, updateUserPreferences, fetchUserBusinesses } from "../models/user";

/**
 * Get user profile and preferences
 * GET /getUser?userId=<userId>
 */
export const getUserEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "GET") {
			res.status(405).json({ error: "Method not allowed" });
			return;
		}

		const userId = req.query.userId as string;

		if (!userId) {
			res.status(400).json({ error: "User ID is required" });
			return;
		}

		const user = await fetchUser(userId);

		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		// Don't return sensitive auth tokens
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { accessToken, refreshToken, ...safeUser } = user as any;
		res.json(safeUser);
	} catch (error) {
		console.error("Error getting user:", error);
		res.status(500).json({ error: "Failed to get user" });
	}
});

/**
 * Update user preferences
 * PUT /updateUserPreferences
 */
export const updateUserPreferencesEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "PUT") {
			res.status(405).json({ error: "Method not allowed" });
			return;
		}

		const { userId, preferences } = req.body;

		if (!userId || !preferences) {
			res.status(400).json({ error: "User ID and preferences are required" });
			return;
		}

		await updateUserPreferences(userId, preferences);
		res.json({ success: true, message: "Preferences updated" });
	} catch (error) {
		console.error("Error updating user preferences:", error);
		res.status(500).json({ error: "Failed to update preferences" });
	}
});

/**
 * Get businesses owned by user
 * GET /getUserBusinesses?userId=<userId>
 */
export const getUserBusinessesEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "GET") {
			res.status(405).json({ error: "Method not allowed" });
			return;
		}

		const userId = req.query.userId as string;

		if (!userId) {
			res.status(400).json({ error: "User ID is required" });
			return;
		}

		const businesses = await fetchUserBusinesses(userId);
		res.json(businesses);
	} catch (error) {
		console.error("Error getting user businesses:", error);
		res.status(500).json({ error: "Failed to get user businesses" });
	}
});
