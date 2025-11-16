/**
 * Business model - minimal business information for MVP
 */
import { db } from "../utils/firebase";

export interface Business {
	id: string;
	name: string;
	domain?: string;
	ownerId: string; // User who owns this business
	vendastaBusinessId?: string;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * Create a new business
 */
export async function createBusiness(businessData: Omit<Business, "id" | "createdAt" | "updatedAt">) {
	const businessDoc = {
		...businessData,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const docRef = await db.collection("businesses").add(businessDoc);
	return { id: docRef.id, ...businessDoc };
}

/**
 * Get business by ID
 */
export async function fetchBusiness(businessId: string): Promise<Business | null> {
	const doc = await db.collection("businesses").doc(businessId).get();

	if (!doc.exists) {
		return null;
	}

	return { id: doc.id, ...doc.data() } as Business;
}

/**
 * Get business by Vendasta business ID
 */
export async function fetchBusinessByVendastaId(vendastaBusinessId: string): Promise<Business | null> {
	const snapshot = await db.collection("businesses")
		.where("vendastaBusinessId", "==", vendastaBusinessId)
		.limit(1)
		.get();

	if (snapshot.empty) {
		return null;
	}

	const doc = snapshot.docs[0];
	return { id: doc.id, ...doc.data() } as Business;
}

/**
 * Update business information
 */
export async function updateBusiness(businessId: string, updates: Partial<Omit<Business, "id" | "createdAt">>) {
	await db.collection("businesses").doc(businessId).update({
		...updates,
		updatedAt: new Date(),
	});
}
