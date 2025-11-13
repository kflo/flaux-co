/**
 * Business management API endpoints
 */

import { onRequest } from "firebase-functions/v2/https";
import { createBusiness, fetchBusiness } from "../models/business";

/**
 * Create a new business
 * POST /createBusiness
 */
export const createBusinessEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "POST") {
			res.status(405).json({ error: "Method not allowed" });
			return;
		}

		const { name, domain, ownerId } = req.body;

		if (!name || !ownerId) {
			res.status(400).json({ error: "Business name and owner ID are required" });
			return;
		}

		const business = await createBusiness({
			name,
			domain,
			ownerId,
		});

		res.status(201).json(business);
	} catch (error) {
		console.error("Error creating business:", error);
		res.status(500).json({ error: "Failed to create business" });
	}
});

/**
 * Get business details
 * GET /getBusiness?id=<businessId>
 */
export const getBusinessEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "GET") {
			res.status(405).json({ error: "Method not allowed" });
			return;
		}

		// Extract ID from query parameter: /getBusiness?id=123
		const businessId = req.query.id as string;

		if (!businessId) {
			res.status(400).json({ error: "Business ID is required" });
			return;
		}

		const business = await fetchBusiness(businessId);

		if (!business) {
			res.status(404).json({ error: "Business not found" });
			return;
		}

		res.json(business);
	} catch (error) {
		console.error("Error getting business:", error);
		res.status(500).json({ error: "Failed to get business" });
	}
});
