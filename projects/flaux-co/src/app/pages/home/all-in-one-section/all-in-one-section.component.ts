import { AfterContentInit, Component } from '@angular/core';
import { FlauxSectionComponent } from '@app/shared/section/section.component';

@Component({
	selector: 'all-in-one-section',
	standalone: true,
	templateUrl: './all-in-one-section.component.html',
	styleUrls: ['./all-in-one-section.component.scss'],
	imports: [FlauxSectionComponent],
})
export class AllInOneSectionComponent implements AfterContentInit {
	ngAfterContentInit(): void {
		const video = document.getElementById('bgVideo') as HTMLVideoElement;
		if (video) {
			video.muted = true;
			video.play();
		}
	}
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
