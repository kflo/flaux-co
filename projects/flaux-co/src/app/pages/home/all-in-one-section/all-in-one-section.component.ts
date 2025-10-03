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

	// @ViewChild('lottieContainer', { static: true }) lottieContainer!: ElementRef;

	// ngAfterViewInit(): void {
	//	lottie.loadAnimation({
	//		container: this.lottieContainer.nativeElement, // reference to the div
	//		renderer: 'svg',
	//		loop: true,
	//		autoplay: true,
	//		path: 'assets/lottie/list-scroll-wide.json',
	//	});
	// }
}
