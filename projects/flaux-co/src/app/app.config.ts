/* -------------------------------- FIREBASE -------------------------------- */
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
/* ----------------------------------- // ----------------------------------- */
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideZonelessChangeDetection(), provideRouter(routes)],
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD7kLGq-z76CAcmdd8FpLIJRk8ltVjbDCM',
  authDomain: 'flaux-agency.firebaseapp.com',
  projectId: 'flaux-agency',
  storageBucket: 'flaux-agency.firebasestorage.app',
  messagingSenderId: '112669345200',
  appId: '1:112669345200:web:c724121aaf6fb0ebfd0275',
  measurementId: 'G-Q95N0EQ5LY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
