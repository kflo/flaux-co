import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import lottie from 'lottie-web';
import { Bg2Component } from '../../../../components/bg2/bg2.component';
import { FlauxFnComponent } from "@app/shared/fn/fn.component";

@Component({
  selector: 'hero-section',
  standalone: true,
  imports: [Bg2Component, FlauxFnComponent],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements AfterViewInit {
  // @ViewChild('lottieContainer', { static: true }) lottieContainer!: ElementRef;

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
