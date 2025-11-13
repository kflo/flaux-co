/* eslint-disable max-len */
/**
 * Flaux subscription management API endpoints
 */

import { onRequest } from "firebase-functions/v2/https";
import {
	createSubscription, fetchSubscription, fetchUserActiveSubscriptions, updateSubscriptionStatus, cancelSubscriptionAtPeriodEnd,
} from "../models/flaux/subscription";

/**
 * Create a new Flaux subscription
 * POST /createFlauxSubscription
 */
export const createFlauxSubscriptionEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "POST") {
			res.status(405).json({ error: "Method not allowed" });
			return;
		}

		const {
			userId,
			productId,
			businessId,
			interval,
			amount,
			paymentMethod,
			currentPeriodStart,
			currentPeriodEnd,
		} = req.body;

		if (!userId || !productId || !interval || !amount || !paymentMethod) {
			res.status(400).json({ error: "Required fields: userId, productId, interval, amount, paymentMethod" });
			return;
		}

		const subscription = await createSubscription({
			userId,
			productId,
			businessId,
			status: "active",
			interval,
			amount,
			currency: "USD",
			paymentMethod,
			currentPeriodStart: new Date(currentPeriodStart),
			currentPeriodEnd: new Date(currentPeriodEnd),
			cancelAtPeriodEnd: false,
		});

		res.status(201).json(subscription);
	} catch (error) {
		console.error("Error creating Flaux subscription:", error);
		res.status(500).json({ error: "Failed to create subscription" });
	}
});

/**
 * Get specific Flaux subscription
 * GET /getFlauxSubscription?subscriptionId=<subscriptionId>
 */
export const getFlauxSubscriptionEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "GET") {
			res.status(405).json({ error: "Method not allowed" });
			return;
		}

		const subscriptionId = req.query.subscriptionId as string;

		if (!subscriptionId) {
			res.status(400).json({ error: "Subscription ID is required" });
			return;
		}

		const subscription = await fetchSubscription(subscriptionId);

		if (!subscription) {
			res.status(404).json({ error: "Subscription not found" });
			return;
		}

		res.json(subscription);
	} catch (error) {
		console.error("Error getting Flaux subscription:", error);
		res.status(500).json({ error: "Failed to get subscription" });
	}
});

/**
 * Get active subscriptions for a user
 * GET /getUserFlauxSubscriptions?userId=<userId>
 */
export const getUserFlauxSubscriptionsEndpoint = onRequest({
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

		const subscriptions = await fetchUserActiveSubscriptions(userId);
		res.json(subscriptions);
	} catch (error) {
		console.error("Error getting user Flaux subscriptions:", error);
		res.status(500).json({ error: "Failed to get user subscriptions" });
	}
});

/**
 * Cancel subscription at period end
 * PUT /cancelFlauxSubscription
 */
export const cancelFlauxSubscriptionEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "PUT") {
			res.status(405).json({ error: "Method not allowed" });
			return;
		}

		const { subscriptionId } = req.body;

		if (!subscriptionId) {
			res.status(400).json({ error: "Subscription ID is required" });
			return;
		}

		await cancelSubscriptionAtPeriodEnd(subscriptionId);
		res.json({ success: true, message: "Subscription will be cancelled at period end" });
	} catch (error) {
		console.error("Error cancelling Flaux subscription:", error);
		res.status(500).json({ error: "Failed to cancel subscription" });
	}
});

/**
 * Update subscription status (webhook/admin use)
 * PUT /updateFlauxSubscriptionStatus
 */
export const updateFlauxSubscriptionStatusEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "PUT") {
			res.status(405).json({ error: "Method not allowed" });
			return;
		}

		const { subscriptionId, status } = req.body;

		if (!subscriptionId || !status) {
			res.status(400).json({ error: "Subscription ID and status are required" });
			return;
		}

		await updateSubscriptionStatus(subscriptionId, status);
		res.json({ success: true, message: "Subscription status updated" });
	} catch (error) {
		console.error("Error updating Flaux subscription status:", error);
		res.status(500).json({ error: "Failed to update subscription status" });
	}
});
