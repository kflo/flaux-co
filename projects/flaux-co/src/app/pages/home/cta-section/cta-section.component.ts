import { Component } from '@angular/core';
import { FlauxSectionComponent } from '@app/shared/section/section.component';
import { FlauxLottieComponent } from '@app/shared/flaux-lottie/flaux-lottie.component';
import { FlauxBtnComponent } from '@app/shared/flaux-btn/flaux-btn.component';
import {FlauxFnComponent} from '@app/shared/fn/fn.component';

@Component({
	selector: 'cta-section',
	standalone: true,
	imports: [FlauxSectionComponent, FlauxLottieComponent, FlauxBtnComponent, FlauxFnComponent],
	templateUrl: './cta-section.component.html',
	styleUrls: ['./cta-section.component.scss'],
})
export class CtaSectionComponent {

	scrollFilterFn = (visible: number) => {
		console.debug({ visible });
		return `hue-rotate(${visible * 180}deg) invert(${visible})`;
	};
}
