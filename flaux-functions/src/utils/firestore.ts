/**
 * Firestore database helper functions
 */

import {db} from "./firebase";

// Create or update a business document
export async function createBusiness(businessData: {
	name: string;
	domain?: string;
	vendastaBusinessId?: string;
	subscriptionTier?: string;
}) {
	const businessDoc = {
		...businessData,
		subscriptionTier: businessData.subscriptionTier || "starter",
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const docRef = await db.collection("businesses").add(businessDoc);
	return {id: docRef.id, ...businessDoc};
}

// Get business by ID
export async function fetchBusiness(businessId: string) {
	const doc = await db.collection("businesses").doc(businessId).get();

	if (!doc.exists) {
		return null;
	}

	return {id: doc.id, ...doc.data()};
}

// Get business by Vendasta business ID
export async function fetchBusinessByVendastaId(vendastaBusinessId: string) {
	const snapshot = await db.collection("businesses")
		.where("vendastaBusinessId", "==", vendastaBusinessId)
		.limit(1)
		.get();

	if (snapshot.empty) {
		return null;
	}

	const doc = snapshot.docs[0];
	return {id: doc.id, ...doc.data()};
}


// Add product access to business
export async function addBusinessProduct(businessId: string, productData: {
	productType: string;
	productName: string;
	source: string;
	vendastaSubscriptionId?: string;
	config?: any;
}) {
	const productDoc = {
		businessId: businessId,
		...productData,
		status: "active",
		config: productData.config || {},
		createdAt: new Date(),
	};

	const docRef = await db.collection("businessProducts").add(productDoc);
	return {id: docRef.id, ...productDoc};
}


// Get all products for a business
export async function fetchBusinessProducts(businessId: string) {
	const snapshot = await db.collection("businessProducts")
		.where("businessId", "==", businessId)
		.where("status", "==", "active")
		.get();

	return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}


// Log usage event
export async function logUsageEvent(eventData: {
	businessId: string;
	userId?: string;
	productType: string;
	eventType: string;
	metadata?: any;
}) {
	const usageDoc = {
		...eventData,
		metadata: eventData.metadata || {},
		timestamp: new Date(),
	};

	await db.collection("usageEvents").add(usageDoc);
}
