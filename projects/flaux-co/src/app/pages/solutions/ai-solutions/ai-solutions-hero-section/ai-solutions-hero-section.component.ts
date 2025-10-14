import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FlauxBgVideoComponent} from '@app/shared/flaux-bg-video/flaux-bg-video.component';
import {FlauxSectionComponent} from '@app/shared/section/section.component';

@Component({
	selector: 'ai-solutions-hero-section',
	imports: [FlauxSectionComponent, FlauxBgVideoComponent],
	templateUrl: './ai-solutions-hero-section.component.html',
	styleUrl: './ai-solutions-hero-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSolutionsHeroSectionComponent { }
