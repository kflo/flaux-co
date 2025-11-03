import { Component } from '@angular/core';
import { FlauxSectionComponent } from "@app/shared/section/section.component";
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FooterComponent } from "@app/shared/footer/footer.component";

@Component({
	selector: 'flaux-login',
	standalone: true,
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
	imports: [FlauxSectionComponent, MatButtonModule, ReactiveFormsModule, FormsModule, MatInputModule, FooterComponent]
})
export class LoginPage {}
