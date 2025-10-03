/**
 * Flaux order management API endpoints
 */

import {onRequest} from "firebase-functions/v2/https";
import {createOrder, fetchOrder, fetchUserOrders, updateOrderStatus} from "../models/flaux/order";

/**
 * Create a new Flaux order (purchase)
 * POST /createFlauxOrder
 */
export const createFlauxOrderEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "POST") {
			res.status(405).json({error: "Method not allowed"});
			return;
		}

		const {userId, productId, businessId, type, amount, paymentMethod, metadata} = req.body;

		if (!userId || !productId || !type || !amount || !paymentMethod) {
			res.status(400).json({error: "Required fields: userId, productId, type, amount, paymentMethod"});
			return;
		}

		const order = await createOrder({
			userId,
			productId,
			businessId,
			type,
			status: "pending",
			amount,
			currency: "USD",
			paymentMethod,
			metadata: metadata || {},
		});

		res.status(201).json(order);
	} catch (error) {
		console.error("Error creating Flaux order:", error);
		res.status(500).json({error: "Failed to create order"});
	}
});

/**
 * Get specific Flaux order
 * GET /getFlauxOrder?orderId=<orderId>
 */
export const getFlauxOrderEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "GET") {
			res.status(405).json({error: "Method not allowed"});
			return;
		}

		const orderId = req.query.orderId as string;

		if (!orderId) {
			res.status(400).json({error: "Order ID is required"});
			return;
		}

		const order = await fetchOrder(orderId);

		if (!order) {
			res.status(404).json({error: "Order not found"});
			return;
		}

		res.json(order);
	} catch (error) {
		console.error("Error getting Flaux order:", error);
		res.status(500).json({error: "Failed to get order"});
	}
});

/**
 * Get all orders for a user
 * GET /getUserFlauxOrders?userId=<userId>
 */
export const getUserFlauxOrdersEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "GET") {
			res.status(405).json({error: "Method not allowed"});
			return;
		}

		const userId = req.query.userId as string;

		if (!userId) {
			res.status(400).json({error: "User ID is required"});
			return;
		}

		const orders = await fetchUserOrders(userId);
		res.json(orders);
	} catch (error) {
		console.error("Error getting user Flaux orders:", error);
		res.status(500).json({error: "Failed to get user orders"});
	}
});

/**
 * Update order status (webhook/admin use)
 * PUT /updateFlauxOrderStatus
 */
export const updateFlauxOrderStatusEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "PUT") {
			res.status(405).json({error: "Method not allowed"});
			return;
		}

		const {orderId, status, completedAt} = req.body;

		if (!orderId || !status) {
			res.status(400).json({error: "Order ID and status are required"});
			return;
		}

		await updateOrderStatus(orderId, status, completedAt);
		res.json({success: true, message: "Order status updated"});
	} catch (error) {
		console.error("Error updating Flaux order status:", error);
		res.status(500).json({error: "Failed to update order status"});
	}
});
