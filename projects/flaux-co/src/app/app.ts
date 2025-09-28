import { Component } from '@angular/core';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { DropdownMenuComponent } from '@components/dropdown-menu/dropdown-menu.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';

@Component({
	selector: 'app-root',
	imports: [NavbarComponent, DropdownMenuComponent, FooterComponent, RouterModule],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	protected title = 'flaux-co';
	protected logo = 'assets/logo/SVG/Logo-Set-4.svg';
}
