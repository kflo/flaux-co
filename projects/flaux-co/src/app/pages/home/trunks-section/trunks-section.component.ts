import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FlauxSectionComponent } from '@app/shared/flaux-section/flaux-section.component';
import { FlauxBtnComponent } from "@app/shared/flaux-btn/flaux-btn.component";
import { LaserFlowComponent } from '@app/shared/laser-flow';
import { FlauxBgVideoComponent } from '@app/shared/flaux-bg-video/flaux-bg-video.component';
import { UxService } from '@app/services/ux.service';
import { NgClass } from '@angular/common';
import { HlsComponent } from "@app/shared/flaux-hls/flaux-hls.component";
import { environment } from 'projects/flaux-co/environments/environment';

@Component({
	selector: 'trunks-section',
	imports: [FlauxSectionComponent, FlauxBtnComponent, LaserFlowComponent, FlauxBgVideoComponent, NgClass, HlsComponent],
	templateUrl: './trunks-section.component.html',
	styleUrl: './trunks-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrunksSectionComponent {

	agencyMarqueeFiles: string[] = [
		'ad-placement-group.png',
		'Attract-convert-engage.png',
		'business-app-18299.png',
		'business-app-42842.png',
		'SM-AI-Knowledge_v1.png',
		'Capture-more-leads-with-converstations-ai-img.webp',
		'Conversations - custom1.png',
		'Copy of Reviews from top review sites.png',
		'Conversations AI - webchat.png',
		'Conversations SMS 3.png',
		'increase-productivity-2.png',
		'Local-SEO-group.png',
		'marketplace16779.png',
		'Multi-location Review Management2.png',
		'SM-AI-Knowledge_v2.png',
		'Reputation Management group.png',
		'Social Marketing post performance.png',
		'snapshot-18067.png',
		'sm3-2.png',
		'social-ads.png'
	];

	private readonly uxService = inject(UxService);


	readonly webLandscape = this.uxService.webLandscape;
	readonly lessThan900 = this.uxService.lessThan900;

	agencySpiralHlsUrl = `${environment.r2BucketUrl}vid/agency-spiral/hls/master.m3u8`;
	agencySpiralPosterUrl = `${environment.r2BucketUrl}img/agency-spiral-poster.jpg`;

}
