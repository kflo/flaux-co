// NOTE: Firebase apiKey is safe to commit publicly - it's a client identifier, not a secret.
// Security is enforced by Firestore Security Rules, Authentication, and API restrictions.
// See: https://firebase.google.com/docs/projects/api-keys
export const environment = {
	production: false,
	useEmulators: false, // Enable Firebase emulators for local dev
	analytics: { measurementId: 'G-QBHYQN1CXL' },
	firebaseConfig: {
		apiKey: "AIzaSyAtB5SX9AcEcNvxr1tkSdbqorknbH6LfAs",
		authDomain: "flaux-site-stg.firebaseapp.com",
		projectId: "flaux-site-stg",
		storageBucket: "flaux-site-stg.firebasestorage.app",
		messagingSenderId: "158147990141",
		appId: "1:158147990141:web:f49041bd2aee241e731714",
		measurementId: "G-QBHYQN1CXL"
	},
	r2BucketUrl: 'https://cdn.flaux.co/',
};
