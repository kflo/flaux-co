import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UxService } from '@app/services/ux.service';

@Component({
	selector: 'flaux-nav-menu',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './nav-menu.component.html',
	styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit, OnDestroy {
	private uxService = inject(UxService);
	isMenuOpen = this.uxService.isDropdownOpen;

	ngOnInit() {
		// Close dropdown when clicking outside
		document.addEventListener('click', (event) => {
			if (!(event.target as Element).closest('.dropdown-menu') &&
          !(event.target as Element).closest('.dropdown-trigger')) {
				this.uxService.closeDropdown();
			}
		});
	}

	ngOnDestroy() {
		// Clean up is handled automatically by the service
	}

	onLinkClick() {
		this.uxService.closeDropdown();
	}
}
