/**
 * Flaux product model - Flaux's purchasable products, flows, and tools
 */
import { db } from "../../utils/firebase";

export interface FlauxProduct {
	id: string;
	name: string;
	description: string;
	type: "flow" | "tool" | "template" | "service";
	pricing: {
		model: "one-time" | "subscription" | "project-based";
		amount: number; // in cents
		currency: "USD";
		interval?: "month" | "year"; // for subscriptions
	};
	features: string[];
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Get all active Flaux products
 */
export async function fetchActiveProducts(): Promise<FlauxProduct[]> {
	const snapshot = await db.collection("flaux_products")
		.where("isActive", "==", true)
		.orderBy("name")
		.get();

	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as FlauxProduct));
}

/**
 * Get Flaux product by ID
 */
export async function fetchProduct(productId: string): Promise<FlauxProduct | null> {
	const doc = await db.collection("flaux_products").doc(productId).get();

	if (!doc.exists) {
		return null;
	}

	return { id: doc.id, ...doc.data() } as FlauxProduct;
}

/**
 * Create a new Flaux product (admin function)
 */
export async function createProduct(productData: Omit<FlauxProduct, "id" | "createdAt" | "updatedAt">) {
	const productDoc = {
		...productData,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const docRef = await db.collection("flaux_products").add(productDoc);
	return { id: docRef.id, ...productDoc };
}

/**
 * Update Flaux product (admin function)
 */
export async function updateProduct(productId: string, updates: Partial<Omit<FlauxProduct, "id" | "createdAt">>) {
	await db.collection("flaux_products").doc(productId).update({
		...updates,
		updatedAt: new Date(),
	});
}
