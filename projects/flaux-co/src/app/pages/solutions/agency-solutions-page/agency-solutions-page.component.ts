import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlauxSectionComponent } from "@app/shared/section/section.component";
import { BlobBackdropComponent } from "@app/shared/blob-backdrop";
import { GradientBackgroundComponent } from "@app/shared/gradient-background/gradient-background.component";
import { FlauxGlassSectionComponent } from "@app/shared/glass-section";

@Component({
	selector: 'agency-solutions-page',
	imports: [FlauxSectionComponent, BlobBackdropComponent, GradientBackgroundComponent, FlauxGlassSectionComponent],
	hostDirectives: [],
	templateUrl: './agency-solutions-page.component.html',
	styleUrl: './agency-solutions-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencySolutionsPageComponent {
	imagesPath = `../../../../assets/img/driveDL/picks/`;
	imageUrls = [
		'Attract-convert-engage',
		'Business-App-callouts2',
		'Copy of Group 48489',
		'social-ads',
		'Conversations - custom1',
		'NPS-Automate-Feedback',
		'Reputation-Overview',
		'Local-SEO-Listings-near-me',
		'Multi-location Review Management2',
		// 'Social Marketing post performance',
		'Local-SEO-group',
		'Executive Report',
		'Create content with AI',
		// 'Capture-more-leads-with-converstations-ai-img',,
		'Conversations - custom1',
		'Copy of Group 48491'
	];
	private formatImageUrls(names: string[]): string[] {
		return names.map(name => `${this.imagesPath}${name}.png`);
	}

	formattedImageUrls = this.formatImageUrls(this.imageUrls);

	imageUrl2 = `../../../../assets/img/driveDL/picks/Conversations - custom1.png`;


	featureSections: {
		title: string;
		imageUrls: string[];
		imageAlt: string;
		blobBackdrop?: boolean;
		imagePosition: 'left' | 'right';
		titleIcon: string;
		titleSpacing?: boolean;
		description: string;
	}[] = [
			{
				title: 'CONVERSATIONS',
				imageUrls: this.formatImageUrls(['Conversations - custom1', 'CRM-Automataic Opportunity', 'Conversations SMS 3', 'Conversations AI - webchat', 'Conversations AI img 4' ]),
				imageAlt: 'Conversations',
				blobBackdrop: true,
				imagePosition: 'left' as const,
				titleIcon: '../../../../assets/img/icons/ai1.svg',
				description: 'Our conversations platform not only connects your business with customers across various channels, but also makes use of AI so that you never miss a lead, opportunity, or followup.'
			},
			{
				title: 'LOCAL SEO',
				imageUrls: this.formatImageUrls(['Local-SEO-group', 'Local-SEO-Listings-near-me']),
				imageAlt: 'Local SEO',
				imagePosition: 'right' as const,
				titleIcon: '../../../../assets/img/icons/local.svg',
				description: 'Improve your local search presence and attract more customers with our comprehensive Local SEO solutions, including accurate business listings, review management, and localized content strategies.'
			},
			{
				title: 'REPUTATION MANAGEMENT',
				titleSpacing: true,
				imageUrls: this.formatImageUrls(['Reputation-Overview', 'Reputation Management group', 'Competition', 'Copy of Reviews from top review sites']),
				imageAlt: 'Reputation Management',
				imagePosition: 'left' as const,
				titleIcon: '../../../../assets/img/icons/star.svg',
				description: 'Protect and enhance your brand’s reputation with our tailored Reputation Management solutions, including review monitoring, response strategies, and customer feedback analysis.'
			},
			{
				title: 'SOCIAL MEDIA MANAGEMENT',
				imageUrls: this.formatImageUrls(['Social Marketing post performance', 'sm3-2', 'SM-AI-BulkPost-Creation']),
				imageAlt: 'Social Media Management',
				imagePosition: 'right' as const,
				blobBackdrop: true,
				titleSpacing: true,
				titleIcon: '../../../../assets/img/icons/social.svg',
				description: 'Boost your social media presence and engagement with our Social Media Management services, featuring content creation, scheduling, and performance analytics across all major platforms.'
			}

		]

}
