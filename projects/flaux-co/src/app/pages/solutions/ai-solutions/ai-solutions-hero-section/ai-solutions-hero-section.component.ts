import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {UxService} from '@app/services/ux.service';
import {HlsComponent} from '@app/shared/hls/hls.component';
// import {FlauxBgVideoComponent} from '@app/shared/flaux-bg-video/flaux-bg-video.component';
import {IconMarqueeComponent} from '@app/shared/icon-marquee';
import {PrismaticBurstComponent} from '@app/shared/prismatic-burst/prismatic-burst.component';
import {FlauxSectionComponent} from '@app/shared/section/section.component';
import {environment} from 'projects/flaux-co/environments/environment';

@Component({
	selector: 'ai-solutions-hero-section',
	imports: [FlauxSectionComponent, IconMarqueeComponent, PrismaticBurstComponent, HlsComponent],
	templateUrl: './ai-solutions-hero-section.component.html',
	styleUrl: './ai-solutions-hero-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSolutionsHeroSectionComponent {
	aiMarqueeFiles: string[] = [
		'ActiveCampaign Trigger integration.svg',
		'Airtable integration.svg',
		'Anthropic Chat Model integration.svg',
		'APITemplate.io integration.svg',
		'Asana Trigger integration.svg',
		'Bitbucket Trigger integration.svg',
		'Brevo integration.svg',
		'Cal.com Trigger integration.svg',
		'Calendly Trigger integration.svg',
		'ClickUp Trigger integration.svg',
		'CoinGecko integration.svg',
		'Copper integration.svg',
		'DeepSeek Chat Model integration.svg',
		'Discord integration.svg',
		'Embeddings AWS Bedrock integration.svg',
		'Embeddings Azure OpenAI integration.svg',
		'Embeddings Hugging Face Inference integration.svg',
		'Embeddings Ollama integration.svg',
		'Google Calendar Trigger integration.svg',
		'Google Drive integration.svg',
		'Google Gemini integration.svg',
		'Google PaLM Language Model integration.svg',
		'Google Sheets Trigger integration.svg',
		'Google Slides integration.svg',
		'HubSpot Trigger integration.svg',
		'Jira Trigger integration.svg',
		'Lemlist Trigger integration.svg',
		'LinkedIn integration.svg',
		'Magento 2 integration.svg',
		'Mailchimp integration.svg',
		'Mautic Trigger integration.svg',
		'Microsoft Excel 365 integration.svg',
		'Microsoft To Do integration.svg',
		'Monday.com integration.svg',
		'MongoDB integration.svg',
		'Notion Trigger integration.svg',
		'OpenAI integration.svg',
		'PayPal integration.svg',
		'Pipedrive Trigger integration.svg',
		'Raindrop integration.svg',
		'Salesforce integration.svg',
		'SendGrid integration.svg',
		'Shopify integration.svg',
		'Slack integration.svg',
		'Stripe integration.svg',
		'svgexport-1.svg',
		'Todoist integration.svg',
		'Trello Trigger integration.svg',
		'Webflow integration.svg',
		'WooCommerce integration.svg',
		'Wordpress integration.svg',
		'X (Formerly Twitter) integration.svg',
		'Zoho CRM integration.svg'
	];

	hlsUrl = `${environment.r2BucketUrl}vid/vertical-bg-2/hls/master.m3u8`;
	posterUrl = '../../../../../assets/img/automation/vertical-bg-2.png';

	isMobile = inject(UxService).isMobile;
}
