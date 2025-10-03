/**
 * Flaux subscription model - recurring billing management
 */
import {db} from "../../utils/firebase";

export interface FlauxSubscription {
	id: string;
	userId: string;
	businessId?: string;
	productId: string;
	status: "active" | "cancelled" | "past_due" | "paused";
	interval: "month" | "year";
	amount: number; // in cents
	currency: "USD";
	paymentMethod: "stripe" | "vendasta";
	stripeSubscriptionId?: string;
	vendastaSubscriptionId?: string;
	currentPeriodStart: Date;
	currentPeriodEnd: Date;
	cancelAtPeriodEnd: boolean;
	createdAt: Date;
	updatedAt: Date;
	cancelledAt?: Date;
}

/**
 * Create a new Flaux subscription
 */
export async function createSubscription(subscriptionData: Omit<FlauxSubscription, "id" | "createdAt" | "updatedAt">) {
	const subscriptionDoc = {
		...subscriptionData,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const docRef = await db.collection("flaux_subscriptions").add(subscriptionDoc);
	return {id: docRef.id, ...subscriptionDoc};
}

/**
 * Get subscription by ID
 */
export async function fetchSubscription(subscriptionId: string): Promise<FlauxSubscription | null> {
	const doc = await db.collection("flaux_subscriptions").doc(subscriptionId).get();

	if (!doc.exists) {
		return null;
	}

	return {id: doc.id, ...doc.data()} as FlauxSubscription;
}

/**
 * Get active subscriptions for a user
 */
export async function fetchUserActiveSubscriptions(userId: string): Promise<FlauxSubscription[]> {
	const snapshot = await db.collection("flaux_subscriptions")
		.where("userId", "==", userId)
		.where("status", "==", "active")
		.get();

	return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()} as FlauxSubscription));
}

/**
 * Update subscription status
 */
export async function updateSubscriptionStatus(subscriptionId: string, status: FlauxSubscription["status"]) {
	const updates: any = {
		status,
		updatedAt: new Date(),
	};

	if (status === "cancelled") {
		updates.cancelledAt = new Date();
	}

	await db.collection("flaux_subscriptions").doc(subscriptionId).update(updates);
}

/**
 * Get subscription by Stripe subscription ID (for webhook processing)
 */
export async function fetchSubscriptionByStripeId(stripeSubscriptionId: string): Promise<FlauxSubscription | null> {
	const snapshot = await db.collection("flaux_subscriptions")
		.where("stripeSubscriptionId", "==", stripeSubscriptionId)
		.limit(1)
		.get();

	if (snapshot.empty) {
		return null;
	}

	const doc = snapshot.docs[0];
	return {id: doc.id, ...doc.data()} as FlauxSubscription;
}

/**
 * Cancel subscription at period end
 */
export async function cancelSubscriptionAtPeriodEnd(subscriptionId: string) {
	await db.collection("flaux_subscriptions").doc(subscriptionId).update({
		cancelAtPeriodEnd: true,
		updatedAt: new Date(),
	});
}
