import { Component, inject } from '@angular/core';
import { SeoService } from '@app/services/seo.service';

@Component({
	selector: 'flaux-about',
	standalone: true,
	templateUrl: './about.page.html',
	styleUrls: ['./about.page.scss']
})
export class AboutPage {

	private seoService = inject(SeoService);

	ngOnInit() {
		this.seoService.update({
			title: 'About Us | Flaux',
			description: 'Learn more about Flaux, our mission, and our founder. Discover how we help small and medium businesses leverage AI to grow and succeed.',
			image: '/assets/logo/png/Logo Set 4.png',
		});
	}
}
