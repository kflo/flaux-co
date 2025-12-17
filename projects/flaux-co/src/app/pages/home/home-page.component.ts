import { Component, inject, OnInit } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { TrunksSectionComponent } from './trunks-section/trunks-section.component';
import { FooterComponent } from '@app/shared/footer/footer.component';
import { SeoService } from '@app/services/seo.service';

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
	private seoService = inject(SeoService);

	ngOnInit(): void {
		this.seoService.update({
			title: 'Flaux | AI Partner for Growth',
			description: 'Voice & chat agents, automations, and AI marketing built for SMBs.',
			image: '/assets/img/hero-poster.jpg'
		});
	}
}
