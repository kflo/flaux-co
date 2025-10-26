import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import {TrunksSectionComponent} from './trunks-section/trunks-section.component';
import {FooterComponent} from '@components/footer/footer.component';
import { SeoService } from '@app/shared/seo/seo.service';

@Component({
	selector: 'home-page',
	standalone: true,
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	imports: [
		HeroSectionComponent,
		TrunksSectionComponent,
		FooterComponent
	],
})
export class FlauxHomePageComponent implements OnInit {
	constructor(private readonly seo: SeoService) {}

	ngOnInit(): void {
		this.seo.update({
			title: 'Flaux | AI Partner for Growth',
			description: 'Voice & chat agents, automations, and AI marketing built for SMBs.',
			image: '/assets/img/hero-poster.jpg'
		});
	}
}
