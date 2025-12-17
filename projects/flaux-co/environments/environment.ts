// NOTE: Firebase apiKey is safe to commit publicly - it's a client identifier, not a secret.
// Security is enforced by Firestore Security Rules, Authentication, and API restrictions.
// See: https://firebase.google.com/docs/projects/api-keys
export const environment = {
	production: false,
	useEmulators: true, // Enable Firebase emulators for local dev
	cloudFunctionsUrl: 'http://localhost:5001/flaux-site-prod/us-central1',
	// cloudFunctionsUrl: 'https://us-central1-flaux-site-dev.cloudfunctions.net',
	analytics: { measurementId: 'G-SKKXK0E1EK' },
	firebaseConfig: {
		apiKey: "AIzaSyAMnZuSnnvl6XVEadl5aRzrYJS3mn1KX8U",
		authDomain: "localhost",
		projectId: "flaux-site-dev",
		storageBucket: "flaux-site-dev.firebasestorage.app",
		messagingSenderId: "710730588618",
		appId: "1:710730588618:web:43d9698389f21b1a91af33",
		measurementId: "G-SKKXK0E1EK"
	},
	r2BucketUrl: 'https://cdn.flaux.co/',
};
