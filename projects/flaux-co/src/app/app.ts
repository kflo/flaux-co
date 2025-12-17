import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '@app/shared/navbar/navbar.component';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { NavMenuComponent } from '@app/shared/nav-menu/nav-menu.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UxService } from './services/ux.service';
import { UtmService } from './services/utm/utm.service';

@Component({
	selector: 'app-root',
	imports: [NavbarComponent, NavMenuComponent, RouterModule, MatProgressSpinnerModule],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App implements OnInit {
	protected title = 'flaux-co';
	private router = inject(Router);
	private utm = inject(UtmService);

	globalLoading = inject(UxService).globalLoading;


	// Create a signal that tracks whether we're on the dashboard
	protected isDashboard = toSignal(
		this.router.events.pipe(
			filter((event): event is NavigationEnd => event instanceof NavigationEnd),
			map(event => event.urlAfterRedirects.startsWith('/dashboard'))
		),
		{ initialValue: this.router.url.startsWith('/dashboard') }
	);

	ngOnInit(): void {
		this.utmListenerInit();
	}

	utmListenerInit(): void {
		// Capture on initial load + subsequent navigations
		this.utm.captureFromQueryParams(this.router.routerState.snapshot.root.queryParams);

		this.router.events
			.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
			.subscribe(() => {
				this.utm.captureFromQueryParams(this.router.routerState.snapshot.root.queryParams);
			});
	}
}
