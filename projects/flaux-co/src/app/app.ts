import {Component, inject} from '@angular/core';
import {NavbarComponent} from '@app/shared/navbar/navbar.component';
import {Router, RouterModule, NavigationEnd} from '@angular/router';
import {NavMenuComponent} from '@app/shared/nav-menu/nav-menu.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs/operators';

@Component({
	selector: 'app-root',
	imports: [NavbarComponent, NavMenuComponent, RouterModule],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	protected title = 'flaux-co';
	private router = inject(Router);

	// Create a signal that tracks whether we're on the dashboard
	protected isDashboard = toSignal(
		this.router.events.pipe(
			filter((event): event is NavigationEnd => event instanceof NavigationEnd),
			map(event => event.urlAfterRedirects.startsWith('/dashboard'))
		),
		{initialValue: this.router.url.startsWith('/dashboard')}
	);
}
