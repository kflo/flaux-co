import {Component, inject} from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {FlauxSectionComponent} from "@app/shared/flaux-section/flaux-section.component";
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from "@app/shared/footer/footer.component";
import {MatIconModule} from '@angular/material/icon';

@Component({
	selector: 'flaux-login',
	standalone: true,
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
	imports: [FlauxSectionComponent, MatButtonModule, ReactiveFormsModule, FormsModule, MatInputModule, FooterComponent, MatIconModule]
})
export class LoginPage {
	private authService = inject(AuthService);

	loginWithGoogle() {
		this.authService.loginWithGoogle();
	}
}
