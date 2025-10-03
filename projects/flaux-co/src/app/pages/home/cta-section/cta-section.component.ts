import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollFilterDirective } from '@app/directives/scroll-filter.directive';
import { FlauxSectionComponent } from '@app/shared/section/section.component';
import { FlauxFnComponent } from "@app/shared/fn/fn.component";
import { FlauxLottieComponent } from '@app/shared/flaux-lottie/flaux-lottie.component';

@Component({
	selector: 'cta-section',
	standalone: true,
	imports: [RouterLink, FlauxSectionComponent, FlauxFnComponent, FlauxLottieComponent],
	templateUrl: './cta-section.component.html',
	styleUrls: ['./cta-section.component.scss'],
})
export class CtaSectionComponent {

	scrollFilterFn = (visible: number) => {
		console.debug({ visible });
		return `hue-rotate(${visible * 180}deg) invert(${visible})`;
	};
}
