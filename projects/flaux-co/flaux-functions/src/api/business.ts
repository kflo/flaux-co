/**
 * Business management API endpoints
 */

import {onRequest} from "firebase-functions/v2/https";
import {createBusiness, getBusiness} from "../utils/firestore";

/**
 * Create a new business
 * POST /createBusiness
 */
export const createBusinessEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "POST") {
			res.status(405).json({error: "Method not allowed"});
			return;
		}

		const {name, domain, subscriptionTier} = req.body;

		if (!name) {
			res.status(400).json({error: "Business name is required"});
			return;
		}

		const business = await createBusiness({
			name,
			domain,
			subscriptionTier,
		});

		res.status(201).json(business);
	} catch (error) {
		console.error("Error creating business:", error);
		res.status(500).json({error: "Failed to create business"});
	}
});

/**
 * Get business details
 * GET /getBusiness?id=businessId
 */
export const getBusinessEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "GET") {
			res.status(405).json({error: "Method not allowed"});
			return;
		}

		const businessId = req.query.id as string;

		if (!businessId) {
			res.status(400).json({error: "Business ID is required"});
			return;
		}

		const business = await getBusiness(businessId);

		if (!business) {
			res.status(404).json({error: "Business not found"});
			return;
		}

		res.json(business);
	} catch (error) {
		console.error("Error getting business:", error);
		res.status(500).json({error: "Failed to get business"});
	}
});
