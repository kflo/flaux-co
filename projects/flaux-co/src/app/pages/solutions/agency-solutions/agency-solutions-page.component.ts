import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FlauxSectionComponent } from "@app/shared/flaux-section/flaux-section.component";
import { BlobBackdropComponent } from "@app/shared/blob-backdrop";
import { GradientBackgroundComponent } from "@app/shared/gradient-background/gradient-background.component";
import { FlauxGlassSectionComponent } from "@app/shared/glass-section";
import { QuoteItem } from '@app/pages/home/quotes-section/quotes.data';
import { FlauxQuoteCarouselComponent } from '@app/shared/quote-carousel/quote-carousel.component';
import { FlauxQuoteHighlightComponent } from '@app/shared/quote-highlight/quote-highlight.component';
import { MktAiSectionComponent } from '@app/pages/home/mkt-ai-section/mkt-ai-section.component';
import { FooterComponent } from '@app/shared/footer/footer.component';
import { SeoService } from '@app/services/seo.service';
import { UxService } from '@app/services/ux.service';

@Component({
	selector: 'agency-solutions-page',
	imports: [FlauxSectionComponent, BlobBackdropComponent, GradientBackgroundComponent, FlauxGlassSectionComponent, FlauxQuoteCarouselComponent, FlauxQuoteHighlightComponent, MktAiSectionComponent, FooterComponent],
	hostDirectives: [],
	templateUrl: './agency-solutions-page.component.html',
	styleUrl: './agency-solutions-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencySolutionsPageComponent implements OnInit {

	private uxService = inject(UxService);
	private seoService = inject(SeoService);

	readonly isLessThan900 = this.uxService.lessThan900;

	ngOnInit(): void {
		this.seoService.update({
			title: 'Agency Solutions | Flaux',
			description: 'All-in-one platform and services to attract, convert, and retain clients with AI-assisted operations.',
			image: '/assets/img/agency/agency-phone.svg'
		});
	}
	imagesPath = `../../../../assets/img/agency/`;
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
	heroImageLabels = [
		'',
		'FLAUX Business App',
		'FLAUX Business App',
		'FLAUX Digital Ads',
		'FLAUX Conversations Platform',
		'FLAUX NPS Feedback Automation',
		'FLAUX Reputation Management',
		'FLAUX Local SEO',
		'FLAUX Multi Location Reputation Management',
		'FLAUX Local SEO',
		'FLAUX Executive Reporting',
		'FLAUX Email Marketing',
		'FLAUX Conversations Platform',
		'FLAUX Executive Reporting'
	];
	private formatImageUrls(names: string[]): string[] {
		return names.map(name => `${this.imagesPath}${name}.png`);
	}

	heroImageUrls = this.formatImageUrls(this.imageUrls);

	imageUrl2 = `../../../../assets/img/driveDL/picks/Conversations - custom1.png`;


	featureSections: {
		title: string;
		imageUrls: string[];
		imageLabels?: string[];
		imageAlt: string;
		blobBackdrop?: boolean;
		imagePosition: 'left' | 'right';
		titleIcon: string;
		titleSpacing?: boolean;
		description: string;
		list?: string[];
		quotes?: QuoteItem[];
		sectionId?: string;
	}[] = [
			{
				title: 'CONVERSATIONS',
				imageUrls: this.formatImageUrls(['Conversations - custom1', 'CRM-Automataic Opportunity', 'Conversations SMS 3', 'Conversations AI - webchat', 'Conversations AI img 4']),
				imageAlt: 'Conversations',
				blobBackdrop: true,
				imagePosition: 'left' as const,
				titleIcon: '../../../../assets/img/icons/ai1.svg',
				description: 'Our conversations platform not only connects your business with customers across various channels, but also makes use of AI so that you never miss a lead, opportunity, or followup.',
				quotes: [
					{
						quoteStart: 'Response time reduction from 24–48 hours to under 30 seconds yields',
						highlight: 'a 70% ROI boost',
						quoteEnd: ' by capturing leads while interest remains high.',
						source: 'Resonate AI'
					},
					{
						quoteStart: 'AI has driven a ',
						highlight: '372% increase',
						quoteEnd: ' in lead-to-revenue conversion, compared to human-only communication.',
						source: 'Vendasta Research'
					}
				],
				sectionId: 'conversations'
			},
			{
				title: 'LOCAL SEO',
				imageUrls: this.formatImageUrls(['Local-SEO-group', 'Local-SEO-Listings-near-me']),
				imageAlt: 'Local SEO',
				imagePosition: 'right' as const,
				titleIcon: '../../../../assets/img/icons/local.svg',
				description: 'Improve your local search presence and attract more customers with our comprehensive Local SEO solutions, including accurate business listings, review management, and localized content strategies.',
				quotes: [
					{
						quoteStart: '76% of “near me” mobile searches lead to a store visit within 24 hours, and',
						highlight: '28% of local searches result in a purchase.',
						quoteEnd: ' 46% of all Google searches have local intent.',
						source: 'WiserReview / Search Endurance'
					},
					{
						quoteStart: 'Customers are ',
						highlight: '70% more likely to visit and 50% more likely to make a purchase',
						quoteEnd: ' from a business with a complete Google Business Profile.',
						source: 'Searchonic / Google'
					},
					{
						quoteStart: 'Businesses with complete listings on local directories see ',
						highlight: '7x more clicks',
						quoteEnd: ' than those without complete information.',
						source: 'Searchonic / Google'
					},
					{
						quoteStart: 'Consumers read online reviews for local businesses',
						highlight: '98%',
						quoteEnd: ' of the time before making a decision.',
						source: 'BrightLocal'
					},
				],
				sectionId: 'local-seo'
			},
			{
				title: 'REPUTATION MANAGEMENT',
				titleSpacing: true,
				imageUrls: this.formatImageUrls(['Reputation-Overview', 'Competition', 'Copy of Reviews from top review sites']),
				imageAlt: 'Reputation Management',
				imagePosition: 'left' as const,
				titleIcon: '../../../../assets/img/icons/star.svg',
				description: 'Protect and enhance your brand’s reputation with our tailored Reputation Management solutions, including review monitoring, response strategies, and customer feedback analysis.',
				quotes: [
					{
						quoteStart: 'Businesses with a 4+ star rating',
						highlight: 'earn 28% more',
						quoteEnd: 'in annual revenue than those who don’t.',
						source: 'Womply'
					},
					{
						quoteStart: 'A customer is 21% more likely to make a purchase after seeing',
						highlight: 'just one verified review',
						quoteEnd: ' of a product or service.',
						source: 'BrightLocal'
					}
				],
				sectionId: 'reputation-management'
			},
			{
				title: 'SOCIAL MEDIA MANAGEMENT',
				imageUrls: this.formatImageUrls(['Social Marketing post performance', 'sm3-2', 'SM-AI-BulkPost-Creation']),
				imageAlt: 'Social Media Management',
				imagePosition: 'right' as const,
				blobBackdrop: true,
				titleSpacing: true,
				titleIcon: '../../../../assets/img/icons/social.svg',
				description: 'Boost your social media presence and engagement with our Social Media Management services, featuring content creation, scheduling, and performance analytics across all major platforms.',
				// list: [
				// 	'Publish consistently across all your social media accounts with one-click posting',
				// 	'Generate on-brand content effortlessly using AI-powered tools',
				// 	'Grow your audience and build a loyal fanbase',
				// 	'Increase sales with shoppable bios that convert followers to customers',
				// 	'Track your ROI with detailed social media performance reports'
				// ],
				quotes: [
					{
						quoteStart: '78% of businesses that engage in social media',
						highlight: 'outperform their peers who do not',
						quoteEnd: ' in customer acquisition and retention.',
						source: 'Forrester'
					},
					{
						quoteStart: '',
						highlight: '58% of consumers',
						quoteEnd: ' first discover new businesses on social media.',
						source: 'Synup'
					},
					{
						quoteStart: 'A good social media experience with a brand makes customers',
						highlight: '76% more likely to recommend',
						quoteEnd: ' it to others.',
						source: 'Synup'
					}
				],
				sectionId: 'social-media-management'
			},
			{
				title: 'DIGITAL MARKETING',
				imageUrls: this.formatImageUrls(['Campaign-performance', 'Create content with AI', 'Add to campaign', 'Campaign-automation', 'Campaign-Dynamic-fields']),
				imageAlt: 'Digital Marketing',
				imagePosition: 'left' as const,
				blobBackdrop: true,
				titleSpacing: true,
				titleIcon: '../../../../assets/img/icons/marketing-mega.svg',
				description: 'Maximize your online reach and conversions with our comprehensive Digital Marketing & Ads solutions, including targeted ad campaigns, AI-driven content creation, and performance optimization across multiple channels.',
				quotes: [
					{
						quoteStart: 'Businesses that utilize targeted digital advertising see an average',
						highlight: '20% increase',
						quoteEnd: ' in sales within the first three months.',
						source: 'WordStream'
					},
					{
						quoteStart: 'Email marketing delivers a median ROI of',
						highlight: '$36 for every $1 spent',
						quoteEnd: ' across industries.',
						source: 'Litmus'
					},
				],
				sectionId: 'digital-marketing-ads'
			}
		]
}
