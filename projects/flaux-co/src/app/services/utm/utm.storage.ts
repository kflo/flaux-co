// utm.storage.ts
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class BrowserStorage {
	private platformId = inject(PLATFORM_ID);

	getItem(key: string): string | null {
		if (!isPlatformBrowser(this.platformId)) return null;
		return window.localStorage.getItem(key);
	}

	setItem(key: string, value: string): void {
		if (!isPlatformBrowser(this.platformId)) return;
		window.localStorage.setItem(key, value);
	}

	removeItem(key: string): void {
		if (!isPlatformBrowser(this.platformId)) return;
		window.localStorage.removeItem(key);
	}
}
