import { Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UxService {
	private dropdownOpenSignal = signal(false);

	// Read-only signal for components to subscribe to
	readonly isDropdownOpen = this.dropdownOpenSignal.asReadonly();

	readonly isMobile;
	readonly webLandscape;

	constructor(private breakpointObserver: BreakpointObserver) {
		const breakpoints = [Breakpoints.XSmall, Breakpoints.WebLandscape];
		const breakpoint$ = this.breakpointObserver.observe(breakpoints);

		this.isMobile = toSignal(
			breakpoint$.pipe(map(result => result.breakpoints[Breakpoints.XSmall])),
			{ initialValue: false }
		);

		this.webLandscape = toSignal(
			breakpoint$.pipe(map(result => result.breakpoints[Breakpoints.WebLandscape])),
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
}
