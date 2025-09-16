import { AfterContentInit, Component } from '@angular/core';
import { FlauxSectionComponent } from '@app/shared/section/section.component';

@Component({
  selector: 'features-section',
  standalone: true,
  templateUrl: './features-section.component.html',
  styleUrls: ['./features-section.component.scss'],
  imports: [FlauxSectionComponent],
})
export class FeaturesSectionComponent implements AfterContentInit {
  ngAfterContentInit(): void {
    const video = document.getElementById('bgVideo') as HTMLVideoElement;
    if (video) {
      video.muted = true;
      video.play();
    }
  }
  // @ViewChild('lottieContainer', { static: true }) lottieContainer!: ElementRef;

  // ngAfterViewInit(): void {
  //   lottie.loadAnimation({
  //     container: this.lottieContainer.nativeElement, // reference to the div
  //     renderer: 'svg',
  //     loop: true,
  //     autoplay: true,
  //     path: 'assets/lottie/list-scroll-wide.json',
  //   });
  // }
}
