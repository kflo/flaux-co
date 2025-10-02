/**
 * User model - authentication, profile, and preferences
 */
import {db} from "../utils/firebase";

export interface User {
	id: string;
	email: string;
	name: string;
	authProvider: "vendasta" | "firebase";
	vendastaUserId?: string;
	firebaseUid?: string;
	preferences: {
		theme?: "light" | "dark";
		notifications?: boolean;
		timezone?: string;
	};
	createdAt: Date;
	updatedAt: Date;
	lastLogin?: Date;
}

/**
 * Create or update user document
 */
export async function createOrUpdateUser(userData: Partial<User> & {id: string}) {
	const userDoc = {
		...userData,
		preferences: userData.preferences || {},
		updatedAt: new Date(),
	};

	await db.collection("users").doc(userData.id).set(userDoc, {merge: true});
	return userDoc;
}

/**
 * Get user by ID
 */
export async function fetchUser(userId: string): Promise<User | null> {
	const doc = await db.collection("users").doc(userId).get();

	if (!doc.exists) {
		return null;
	}

	return {id: doc.id, ...doc.data()} as User;
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(userId: string, preferences: Partial<User["preferences"]>) {
	await db.collection("users").doc(userId).update({
		preferences,
		updatedAt: new Date(),
	});
}

/**
 * Get businesses owned by user
 */
export async function fetchUserBusinesses(userId: string) {
	const snapshot = await db.collection("businesses")
		.where("ownerId", "==", userId)
		.get();

	return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}
