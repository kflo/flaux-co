import {Injectable, signal, WritableSignal, inject} from '@angular/core';
import {Router} from '@angular/router';
import {
	getAuth,
	signInWithRedirect,
	getRedirectResult,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	Auth,
	User
} from 'firebase/auth';
import {UxService} from './ux.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private auth: Auth = getAuth();
	private router = inject(Router);
	private uxService = inject(UxService);

	public readonly user: WritableSignal<User | null> = signal(null);

	constructor () {
		// Handle auth state changes
		onAuthStateChanged(this.auth, (user) => {
			this.user.set(user);

			if (user && this.router.url === '/login') {
				this.uxService.setGlobalLoading(false);
				this.router.navigate(['/dashboard']);
			}
		});

		// Handle redirect result
		getRedirectResult(this.auth)
			.then(result => {
				if (result?.user) {
					this.user.set(result.user);
					this.uxService.setGlobalLoading(false);
					this.router.navigate(['/dashboard']);
				}
			})
			.catch(error => {
				this.uxService.setGlobalLoading(false);
				console.error('Redirect error:', error);
			});
	}

	async loginWithGoogle(): Promise<void> {
		this.uxService.setGlobalLoading(true);
		const provider = new GoogleAuthProvider();
		await signInWithRedirect(this.auth, provider);
	}

	async logout(): Promise<void> {
		await signOut(this.auth);
		this.router.navigate(['/login']);
	}
}
