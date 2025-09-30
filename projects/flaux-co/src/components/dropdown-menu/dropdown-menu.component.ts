import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UxService } from '@app/services/ux.service';

@Component({
  selector: 'flaux-dropdown-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements OnInit, OnDestroy {
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
}
