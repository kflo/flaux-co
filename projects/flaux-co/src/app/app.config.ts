/* -------------------------------- FIREBASE -------------------------------- */
import {initializeApp} from 'firebase/app';

/* ----------------------------------- // ----------------------------------- */
import {ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, provideAppInitializer} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import {routes} from './app.routes';
import {environment} from '../../environments/environment';
import {GoogleAnalyticsService} from './services/google-analytics.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

// Initialize Firebase
initializeApp(environment.firebaseConfig);

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideRouter(routes, withInMemoryScrolling({
			scrollPositionRestoration: 'top'
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
