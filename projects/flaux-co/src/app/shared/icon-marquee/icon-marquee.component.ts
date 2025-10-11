import {
	Component,
	Input,
	OnInit,
	ElementRef,
	Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-icon-marquee',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './icon-marquee.component.html',
	styleUrl: './icon-marquee.component.scss',
})
export class IconMarqueeComponent implements OnInit {
	@Input() iconPath: string = '../../../../assets/img/icons/n8n/';
	@Input() animationSpeed: number = 60; // seconds for full cycle
	@Input() iconSize: string = '40px';
	@Input() gapSize: string = '15px';

	constructor(private el: ElementRef, private renderer: Renderer2) {}

	// List of n8n integration icons
	icons: string[] = [
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
		'Facebook Trigger integration.svg',
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
		'svgexport-13.svg',
		'svgexport-15.svg',
		'svgexport-9.svg',
		'Todoist integration.svg',
		'Trello Trigger integration.svg',
		'Webflow integration.svg',
		'WooCommerce integration.svg',
		'Wordpress integration.svg',
		'X (Formerly Twitter) integration.svg',
		'Zoho CRM integration.svg'
	];

	// Split icons into two rows for better visual distribution
	row1Icons: string[] = [];
	row2Icons: string[] = [];

	ngOnInit() {
		// Shuffle and split icons into two rows
		const shuffledIcons = [...this.icons].sort(() => Math.random() - 0.5);
		const midPoint = Math.ceil(shuffledIcons.length / 2);
		this.row1Icons = shuffledIcons.slice(0, midPoint);
		this.row2Icons = shuffledIcons.slice(midPoint);

		// Set CSS custom properties for styling
		this.renderer.setStyle(this.el.nativeElement, '--icon-size', this.iconSize);
		this.renderer.setStyle(this.el.nativeElement, '--gap-size', this.gapSize);
	}

	getIconPath(iconName: string): string {
		return `${this.iconPath}${iconName}`;
	}

	trackByIcon(index: number, icon: string): string {
		return icon;
	}
}
