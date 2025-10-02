/**
 * Flaux order model - purchase transactions and project work
 */
import {db} from "../../utils/firebase";

export interface FlauxOrder {
	id: string;
	userId: string;
	businessId?: string;
	productId: string;
	type: "one-time" | "project";
	status: "pending" | "processing" | "completed" | "cancelled" | "refunded";
	amount: number; // in cents
	currency: "USD";
	paymentMethod: "stripe" | "vendasta";
	paymentIntentId?: string; // Stripe payment intent or Vendasta transaction ID
	metadata: {
		projectDetails?: any;
		customRequirements?: string;
		estimatedDelivery?: Date;
	};
	createdAt: Date;
	updatedAt: Date;
	completedAt?: Date;
}

/**
 * Create a new Flaux order
 */
export async function createOrder(orderData: Omit<FlauxOrder, "id" | "createdAt" | "updatedAt">) {
	const orderDoc = {
		...orderData,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const docRef = await db.collection("flaux_orders").add(orderDoc);
	return {id: docRef.id, ...orderDoc};
}

/**
 * Get order by ID
 */
export async function fetchOrder(orderId: string): Promise<FlauxOrder | null> {
	const doc = await db.collection("flaux_orders").doc(orderId).get();

	if (!doc.exists) {
		return null;
	}

	return {id: doc.id, ...doc.data()} as FlauxOrder;
}

/**
 * Get all orders for a user
 */
export async function fetchUserOrders(userId: string): Promise<FlauxOrder[]> {
	const snapshot = await db.collection("flaux_orders")
		.where("userId", "==", userId)
		.orderBy("createdAt", "desc")
		.get();

	return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()} as FlauxOrder));
}

/**
 * Update order status
 */
export async function updateOrderStatus(orderId: string, status: FlauxOrder["status"], completedAt?: Date) {
	const updates: any = {
		status,
		updatedAt: new Date(),
	};

	if (status === "completed" && completedAt) {
		updates.completedAt = completedAt;
	}

	await db.collection("flaux_orders").doc(orderId).update(updates);
}

/**
 * Get orders by payment intent ID (for webhook processing)
 */
export async function fetchOrderByPaymentIntent(paymentIntentId: string): Promise<FlauxOrder | null> {
	const snapshot = await db.collection("flaux_orders")
		.where("paymentIntentId", "==", paymentIntentId)
		.limit(1)
		.get();

	if (snapshot.empty) {
		return null;
	}

	const doc = snapshot.docs[0];
	return {id: doc.id, ...doc.data()} as FlauxOrder;
}
