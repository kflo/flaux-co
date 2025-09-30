import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UxService {
	private dropdownOpenSignal = signal(false);

	// Read-only signal for components to subscribe to
	readonly isDropdownOpen = this.dropdownOpenSignal.asReadonly();

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
