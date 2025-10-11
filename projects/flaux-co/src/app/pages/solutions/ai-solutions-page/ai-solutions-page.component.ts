import { ChangeDetectionStrategy, Component } from '@angular/core';
import {GradientBackgroundComponent} from '@app/shared/gradient-background/gradient-background.component';
import { FlauxSectionComponent } from "@app/shared/section/section.component";
import { LaserFlowComponent } from "@app/shared/laser-flow";
import {environment} from 'projects/flaux-co/environments/environment';
import {FlauxBgVideoComponent} from '@app/shared/flaux-bg-video/flaux-bg-video.component';

@Component({
	selector: 'ai-solutions-page',
	standalone: true,
	imports: [FlauxBgVideoComponent, FlauxSectionComponent],
	templateUrl: './ai-solutions-page.component.html',
	styleUrl: './ai-solutions-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSolutionsPageComponent {

}
