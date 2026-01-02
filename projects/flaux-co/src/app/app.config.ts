/* -------------------------------- FIREBASE -------------------------------- */
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

/* ----------------------------------- // ----------------------------------- */
import {
	ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, provideAppInitializer
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { environment } from '../../environments/environment';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);

// Connect to emulators in development
if (environment.useEmulators) {
	const auth = getAuth(app);
	connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
	console.log('🔥 Connected to Firebase Auth Emulator');
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideRouter(routes, withInMemoryScrolling({
			scrollPositionRestoration: 'enabled',
			anchorScrolling: 'enabled'
		})),
		provideAnimations(),
		provideHttpClient(),
		GoogleAnalyticsService,
		provideAppInitializer(() => {
			const iconRegistry = inject(MatIconRegistry);
			const sanitizer = inject(DomSanitizer);
			iconRegistry.addSvgIcon(
				'google',
				sanitizer.bypassSecurityTrustResourceUrl('../assets/img/icons/n8n/Google PaLM Language Model integration.svg')
			);
		})
	],
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
// const app = initializeApp(environment.firebaseConfig);
// const db = getFirestore(app);
// const analytics = getAnalytics(app);
