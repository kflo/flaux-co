import {Component} from '@angular/core';
import {NavbarComponent} from '@components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {FooterComponent} from '@components/footer/footer.component';
import {NavMenuComponent} from '@components/nav-menu/nav-menu.component';

@Component({
	selector: 'app-root',
	imports: [NavbarComponent, NavMenuComponent, FooterComponent, RouterModule],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	protected title = 'flaux-co';
}
