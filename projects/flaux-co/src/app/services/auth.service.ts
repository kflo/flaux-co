import {Injectable, WritableSignal, signal, NgZone, inject} from '@angular/core';
import {Router} from '@angular/router';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	getRedirectResult,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	Auth,
	User,
	setPersistence,
	browserLocalPersistence
} from 'firebase/auth';
import {environment} from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private auth: Auth;
	private authStateUnsubscribe: (() => void) | null = null;
	private router = inject(Router);

	public readonly user: WritableSignal<User | null> = signal(null);

	constructor (private zone: NgZone) {
		this.auth = getAuth();

		console.log('AuthService constructor - Current URL:', this.router.url);
		console.log('AuthService constructor - Auth state:', this.auth.currentUser ? 'Has user' : 'No user');

		// Set persistence to LOCAL (survives browser restarts)
		setPersistence(this.auth, browserLocalPersistence).catch(error => {
			console.error('Error setting persistence:', error);
		});

		// Listen to auth state changes FIRST
		this.authStateUnsubscribe = onAuthStateChanged(this.auth, user => {
			this.zone.run(() => {
				console.log('Auth state changed:', user ? `User: ${user.email}` : 'No user');
				this.user.set(user);

				// If we have a user and we're on the login page, redirect to dashboard
				if (user && this.router.url === '/login') {
					console.log('User logged in on login page, redirecting to dashboard...');
					this.router.navigate(['/dashboard']);
				}
			});
		});

		// Check for redirect result on app load
		this.zone.run(async () => {
			try {
				console.log('Checking for redirect result...');
				console.log('LocalStorage keys:', Object.keys(localStorage).filter(k => k.includes('firebase')));
				console.log('SessionStorage keys:', Object.keys(sessionStorage).filter(k => k.includes('firebase')));

				const result = await getRedirectResult(this.auth);
				console.log('Redirect result:', result ? `User: ${result.user.email}` : 'No result (this is normal if not returning from OAuth)');

				if (result?.user) {
					this.user.set(result.user);
					// Redirect to dashboard after successful login
					console.log('Navigating to dashboard...');
					await this.router.navigate(['/dashboard']);
					console.log('Navigation complete, current URL:', this.router.url);
				} else {
					// Check if we have a stored user from a previous session
					console.log('No redirect result. Current user from auth:', this.auth.currentUser?.email || 'None');
				}
			} catch (error: any) {
				console.error('Error getting redirect result:', error);
			}
		});
	}

	ngOnDestroy(): void {
		if (this.authStateUnsubscribe) {
			this.authStateUnsubscribe();
		}
	}

	async loginWithGoogle(): Promise<void> {
		const provider = new GoogleAuthProvider();

		try {
			// Set persistence before signing in
			await setPersistence(this.auth, browserLocalPersistence);

			// Use popup in development (avoids Vite HMR issues), redirect in production
			if (!environment.production) {
				console.log('Starting Google Sign-In popup (dev mode)...');
				const result = await signInWithPopup(this.auth, provider);
				if (result.user) {
					console.log('Login successful:', result.user.email);
					await this.router.navigate(['/dashboard']);
				}
			} else {
				console.log('Starting Google Sign-In redirect (production mode)...');
				await signInWithRedirect(this.auth, provider);
			}
		} catch (error: any) {
			if (error?.code === 'auth/popup-closed-by-user') {
				console.log('Sign-in popup was closed by user');
			} else {
				console.error('Error during Google login:', error);
			}
		}
	}

	async logout(): Promise<void> {
		await this.zone.run(async () => {
			try {
				await signOut(this.auth);
				this.user.set(null);
				// Redirect to login page after logout
				this.router.navigate(['/login']);
			} catch (error) {
				console.error('Error during logout:', error);
			}
		});
	}
}
