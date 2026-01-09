import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AiSolutionsHeroSectionComponent } from "./ai-solutions-hero-section/ai-solutions-hero-section.component";
import { AiSolutionsCapabilitiesSection } from './ai-solutions-capabilities-section/ai-solutions-capabilities-section.component';
import { CtaSectionComponent } from "@app/pages/home/cta-section/cta-section.component";
import { FooterComponent } from "@app/shared/footer/footer.component";
import { SeoService } from '@app/services/seo.service';
import { PrivacyConfirmedSectionComponent } from './privacy-confirmed-section/privacy-confirmed-section.component';

@Component({
	selector: 'ai-solutions-page',
	standalone: true,
	imports: [PrivacyConfirmedSectionComponent, AiSolutionsHeroSectionComponent, AiSolutionsCapabilitiesSection, CtaSectionComponent, FooterComponent],
	templateUrl: './ai-solutions-page.component.html',
	styleUrl: './ai-solutions-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSolutionsPageComponent implements OnInit {
	private seoService = inject(SeoService);

	ngOnInit(): void {
		this.seoService.update({
			title: 'AI Solutions for SMBs | Flaux',
			description: 'Chat and voice agents, custom AI workflows, and practical marketing to grow your business.',
			image: '/assets/img/agency/ai-web-chat-collage.png'
		});
	}
}
