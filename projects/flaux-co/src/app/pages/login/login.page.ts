import { Component } from '@angular/core';
import { FlauxSectionComponent } from "@app/shared/section/section.component";
import {MatButtonModule} from '@angular/material/button';

@Component({
	selector: 'flaux-login',
	standalone: true,
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
	imports: [FlauxSectionComponent, MatButtonModule]
})
export class LoginPage {}
