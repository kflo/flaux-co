/**
 * Centralized Firebase Admin SDK initialization
 * All Firebase services should import from this file
 */
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK once
const app = initializeApp();

// Export initialized services
export const auth = getAuth(app);
export const db = getFirestore(app);
