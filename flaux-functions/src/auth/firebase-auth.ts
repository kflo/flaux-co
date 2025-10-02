/**
 * Firebase Auth helper functions
 * For users of custom Flaux products
 */

import {auth, db} from "../utils/firebase";

/**
 * Create a custom Firebase user for Flaux products
 */
export async function createFirebaseUser(email: string, password: string, userData: any) {
	try {
		// Create user in Firebase Auth
		const userRecord = await auth.createUser({
			email: email,
			password: password,
			displayName: userData.name,
		});

		// Create user document in Firestore
		const userDoc = {
			firebaseUid: userRecord.uid,
			businessId: userData.businessId,
			email: email,
			name: userData.name,
			authProvider: "firebase",
			role: userData.role || "user",
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		await db.collection("users").doc(userRecord.uid).set(userDoc);

		return userRecord;
	} catch (error) {
		console.error("Error creating Firebase user:", error);
		throw error;
	}
}

/**
 * Verify Firebase ID token and get user data
 */
export async function verifyFirebaseToken(idToken: string) {
	try {
		const decodedToken = await auth.verifyIdToken(idToken);

		// Get user document from Firestore
		const userDoc = await db.collection("users").doc(decodedToken.uid).get();

		if (!userDoc.exists) {
			throw new Error("User document not found");
		}

		return {
			uid: decodedToken.uid,
			...userDoc.data(),
		};
	} catch (error) {
		console.error("Error verifying Firebase token:", error);
		throw error;
	}
}

/**
 * Link Firebase user to business
 */
export async function linkUserToBusiness(uid: string, businessId: string, role = "user") {
	try {
		await db.collection("users").doc(uid).update({
			businessId: businessId,
			role: role,
			updatedAt: new Date(),
		});
	} catch (error) {
		console.error("Error linking user to business:", error);
		throw error;
	}
}
