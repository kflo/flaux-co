/**
 * Authentication middleware and guards
 */

import {Request, Response, NextFunction} from "express";
import {getFirestore} from "firebase-admin/firestore";
import {verifyFirebaseToken} from "./firebase-auth";

const db = getFirestore();

/**
 * Middleware to require Vendasta SSO authentication
 */
export const requireVendastaAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const sessionToken = req.headers.authorization?.replace("Bearer ", "");

		if (!sessionToken) {
			res.status(401).json({error: "Missing session token"});
			return;
		}

		// Verify session token (decode and validate)
		const userId = await verifyVendastaSession(sessionToken);

		if (!userId) {
			res.status(401).json({error: "Invalid session token"});
			return;
		}

		// Get user from Firestore
		const userDoc = await db.collection("users").doc(userId).get();

		if (!userDoc.exists || userDoc.data()?.authProvider !== "vendasta") {
			res.status(401).json({error: "Invalid Vendasta user"});
			return;
		}

		// Add user to request object
		(req as any).user = {id: userId, ...userDoc.data()};
		next();
	} catch (error) {
		console.error("Vendasta auth error:", error);
		res.status(401).json({error: "Authentication failed"});
		return;
	}
};

/**
 * Middleware to require Firebase authentication
 */
export const requireFirebaseAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const idToken = req.headers.authorization?.replace("Bearer ", "");

		if (!idToken) {
			res.status(401).json({error: "Missing ID token"});
			return;
		}

		// Verify Firebase ID token
		const user = await verifyFirebaseToken(idToken);

		// Add user to request object
		(req as any).user = user;
		next();
	} catch (error) {
		console.error("Firebase auth error:", error);
		res.status(401).json({error: "Authentication failed"});
		return;
	}
};

/**
 * Middleware that accepts either auth method
 */
export const requireAnyAuth = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) {
		return res.status(401).json({error: "Missing authentication token"});
	}

	try {
		// Try Firebase auth first
		const user = await verifyFirebaseToken(token);
		(req as any).user = user;
		return next();
	} catch (firebaseError) {
		try {
			// Try Vendasta session auth
			const userId = await verifyVendastaSession(token);
			if (userId) {
				const userDoc = await db.collection("users").doc(userId).get();
				if (userDoc.exists) {
					(req as any).user = {id: userId, ...userDoc.data()};
					return next();
				}
			}
		} catch (vendastaError) {
			// Both failed
		}
	}

	return res.status(401).json({error: "Invalid authentication token"});
};

/**
 * Verify Vendasta session token
 */
async function verifyVendastaSession(sessionToken: string): Promise<string | null> {
	try {
		// Decode session token (simple implementation)
		const decoded = Buffer.from(sessionToken, "base64").toString("utf-8");
		const [userId, timestamp] = decoded.split(":");

		// Check if token is expired (24 hours)
		const tokenTime = parseInt(timestamp);
		const now = Date.now();
		const maxAge = 24 * 60 * 60 * 1000; // 24 hours

		if (now - tokenTime > maxAge) {
			return null;
		}

		return userId;
	} catch (error) {
		return null;
	}
}
