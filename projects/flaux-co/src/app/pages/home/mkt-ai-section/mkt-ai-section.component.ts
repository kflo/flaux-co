import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FlauxSectionComponent} from '@app/shared/section/section.component';
import { FlauxCarouselComponent } from "@app/shared/flaux-carousel/flaux-carousel.component";

@Component({
	selector: 'mkt-ai-section',
	imports: [FlauxSectionComponent, FlauxCarouselComponent],
	templateUrl: './mkt-ai-section.component.html',
	styleUrl: './mkt-ai-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MktAiSectionComponent { }
