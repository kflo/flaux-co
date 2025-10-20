import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { CtaSectionComponent } from './cta-section/cta-section.component';
import {TrunksSectionComponent} from './trunks-section/trunks-section.component';
import {FooterComponent} from '@components/footer/footer.component';

@Component({
	selector: 'home-page',
	standalone: true,
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	imports: [
		HeroSectionComponent,
		CtaSectionComponent,
		TrunksSectionComponent,
		FooterComponent
	],
})
export class FlauxHomePageComponent {}
