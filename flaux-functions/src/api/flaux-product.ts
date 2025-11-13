/**
 * Flaux product catalog API endpoints
 */

import { onRequest } from "firebase-functions/v2/https";
import { fetchActiveProducts, fetchProduct } from "../models/flaux/product";

/**
 * Get all active Flaux products
 * GET /getFlauxProducts
 */
export const getFlauxProductsEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "GET") {
			res.status(405).json({ error: "Method not allowed" });
			return;
		}

		const products = await fetchActiveProducts();
		res.json(products);
	} catch (error) {
		console.error("Error getting Flaux products:", error);
		res.status(500).json({ error: "Failed to get products" });
	}
});

/**
 * Get specific Flaux product details
 * GET /getFlauxProduct?productId=<productId>
 */
export const getFlauxProductEndpoint = onRequest({
	cors: true,
}, async (req, res) => {
	try {
		if (req.method !== "GET") {
			res.status(405).json({ error: "Method not allowed" });
			return;
		}

		const productId = req.query.productId as string;

		if (!productId) {
			res.status(400).json({ error: "Product ID is required" });
			return;
		}

		const product = await fetchProduct(productId);

		if (!product) {
			res.status(404).json({ error: "Product not found" });
			return;
		}

		res.json(product);
	} catch (error) {
		console.error("Error getting Flaux product:", error);
		res.status(500).json({ error: "Failed to get product" });
	}
});
