import { Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UxService {
	private dropdownOpenSignal = signal(false);

	// Read-only signal for components to subscribe to
	readonly isDropdownOpen = this.dropdownOpenSignal.asReadonly();

	readonly isMobile;
	readonly webLandscape;
	readonly lessThan900;
	readonly lessThan1100;

	readonly globalLoading = signal(false);

	constructor (private breakpointObserver: BreakpointObserver) {
		// Check if we're returning from OAuth redirect
		const hasPendingAuth = typeof sessionStorage !== 'undefined' &&
			Object.keys(sessionStorage).some(key => key.includes('firebase:pendingRedirect'));

		if (hasPendingAuth) {
			this.globalLoading.set(true);
		}

		const breakpoints = ['(max-width: 720px)', Breakpoints.WebLandscape, '(max-width: 900px)', '(max-width: 1100px)'];
		const breakpoint$ = this.breakpointObserver.observe(breakpoints);

		// (max-width: 720px)
		this.isMobile = toSignal(
			breakpoint$.pipe(map(result => result.breakpoints['(max-width: 720px)'])),
			{ initialValue: false }
		);

		// (min-width: 1280px) and (orientation: landscape)
		this.webLandscape = toSignal(
			breakpoint$.pipe(map(result => result.breakpoints[Breakpoints.WebLandscape])),
			{ initialValue: false }
		);

		// < 1100 px width
		this.lessThan1100 = toSignal(
			breakpoint$.pipe(map(result => result.breakpoints['(max-width: 1100px)'])),
			{ initialValue: false }
		);

		// < 900 px width
		this.lessThan900 = toSignal(
			breakpoint$.pipe(map(result => result.breakpoints['(max-width: 900px)'])),
			{ initialValue: false }
		);
	}

	toggleDropdown() {
		this.dropdownOpenSignal.update(current => !current);
	}

	openDropdown() {
		this.dropdownOpenSignal.set(true);
	}

	closeDropdown() {
		this.dropdownOpenSignal.set(false);
	}

	setGlobalLoading(isLoading: boolean) {
		this.globalLoading.set(isLoading);
	}
}
