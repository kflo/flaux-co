import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlauxSectionComponent } from "@app/shared/section/section.component";
import { BlobBackdropComponent } from "@app/shared/blob-backdrop";
import { GradientBackgroundComponent } from "@app/shared/gradient-background/gradient-background.component";
import {environment} from 'projects/flaux-co/environments/environment';

@Component({
	selector: 'agency-solutions-page',
	imports: [FlauxSectionComponent, BlobBackdropComponent, GradientBackgroundComponent],
	templateUrl: './agency-solutions-page.component.html',
	styleUrl: './agency-solutions-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencySolutionsPageComponent {
	imageUrls = [
		'Copy of Group 48489',
		'Conversations - custom1',
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
	formattedImageUrls = this.imageUrls.map(name => `../../../../assets/img/driveDL/picks/${name}.png`);

	imageUrl2 = `../../../../assets/img/driveDL/picks/Conversations - custom1.png`;
}
