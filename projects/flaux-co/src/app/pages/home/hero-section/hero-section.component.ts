import { AfterViewInit, Component } from '@angular/core';
import { FlauxFnComponent } from '@app/shared/fn/fn.component';
import {HlsComponent} from '@components/hls/hls.component';

@Component({
	selector: 'hero-section',
	standalone: true,
	imports: [HlsComponent, FlauxFnComponent],
	templateUrl: './hero-section.component.html',
	styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent implements AfterViewInit {
	hlsUrl = '../../../../assets/vid/flaux-hero/hls/master.m3u8';
	posterUrl = '../../../../assets/img/hero-poster.jpg';

	ngAfterViewInit(): void {
		// lottie.loadAnimation({
		//   container: this.lottieContainer.nativeElement, // reference to the div
		//   renderer: 'svg',
		//   loop: true,
		//   autoplay: true,
		//   path: 'assets/lottie/list-scroll-wide.json',
		// });
	}
}
