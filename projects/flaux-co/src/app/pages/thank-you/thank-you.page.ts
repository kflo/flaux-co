import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlauxSectionComponent } from '@app/shared/flaux-section/flaux-section.component';
import { FooterComponent } from '@app/shared/footer/footer.component';
import { FlauxBtnComponent } from '@app/shared/flaux-btn/flaux-btn.component';

@Component({
	selector: 'flaux-thank-you',
	standalone: true,
	imports: [
		FlauxSectionComponent,
		FooterComponent,
		FlauxBtnComponent,
		RouterLink
	],
	templateUrl: './thank-you.page.html',
	styleUrls: ['./thank-you.page.scss']
})
export class ThankYouPage {}
