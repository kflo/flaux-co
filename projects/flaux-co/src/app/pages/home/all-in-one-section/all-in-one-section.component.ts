import { Component } from '@angular/core';
import {FlauxBgVideoComponent} from '@app/shared/flaux-bg-video/flaux-bg-video.component';
import {FlauxLottieComponent} from '@app/shared/flaux-lottie/flaux-lottie.component';
import { FlauxSectionComponent } from '@app/shared/section/section.component';

@Component({
	selector: 'all-in-one-section',
	standalone: true,
	templateUrl: './all-in-one-section.component.html',
	styleUrls: ['./all-in-one-section.component.scss'],
	imports: [FlauxSectionComponent, FlauxBgVideoComponent, FlauxLottieComponent],
})
export class AllInOneSectionComponent {

}
