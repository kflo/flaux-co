import { Component, inject } from '@angular/core';
import { SeoService } from '@app/services/seo.service';
import { FooterComponent } from '@app/shared/footer/footer.component';

@Component({
	selector: 'flaux-about',
	imports: [FooterComponent],
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
			image: '/assets/logo/png/flaux.png',
		});
	}
}
