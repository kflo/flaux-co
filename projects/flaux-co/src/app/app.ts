import {Component} from '@angular/core';
import {NavbarComponent} from '@app/shared/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {NavMenuComponent} from '@app/shared/nav-menu/nav-menu.component';

@Component({
	selector: 'app-root',
	imports: [NavbarComponent, NavMenuComponent, RouterModule],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	protected title = 'flaux-co';
}
