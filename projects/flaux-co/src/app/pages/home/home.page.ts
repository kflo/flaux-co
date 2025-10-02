import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { CtaSectionComponent } from './cta-section/cta-section.component';
import { Features2SectionComponent } from './features2-section/features2-section.component';
import {AllInOneSectionComponent} from './all-in-one-section/all-in-one-section.component';

@Component({
	selector: 'flaux-home',
	standalone: true,
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
	imports: [
		HeroSectionComponent,
		AllInOneSectionComponent,
		Features2SectionComponent,
		CtaSectionComponent,
	],
})
export class FlauxHomePage {}
