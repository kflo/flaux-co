import {Component, Input} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UxService} from '../../services/ux.service';
import {RippleDirective} from '../../app/directives/ripple.directive';

@Component({
	selector: 'flaux-navbar',
	standalone: true,
	imports: [RouterModule, RippleDirective],
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	@Input() logo: string = '../../assets/logo/svg/flaux.svg';

	constructor(private uxService: UxService) { }

	toggleDropdown() {
		this.uxService.toggleDropdown();
	}
}
