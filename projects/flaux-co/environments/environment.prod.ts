// NOTE: Firebase apiKey is safe to commit publicly - it's a client identifier, not a secret.
// Security is enforced by Firestore Security Rules, Authentication, and API restrictions.
// See: https://firebase.google.com/docs/projects/api-keys
export const environment = {
	production: true,
	useEmulators: false, // Enable Firebase emulators for local dev
	cloudFunctionsUrl: 'https://us-central1-flaux-site-prod.cloudfunctions.net',
	analytics: { measurementId: 'G-KXL8Y31FB4' },
	firebaseConfig: {
		apiKey: "AIzaSyAWn-ISIUCWGbRj9zmr2tFeEXQ8BTi3b8E",
		authDomain: "flaux-site-prod.firebaseapp.com",
		projectId: "flaux-site-prod",
		storageBucket: "flaux-site-prod.firebasestorage.app",
		messagingSenderId: "325889727607",
		appId: "1:325889727607:web:3befe63920e3ce02977a72",
		measurementId: "G-KXL8Y31FB4"
	},
	r2BucketUrl: 'https://cdn.flaux.co/',
};
