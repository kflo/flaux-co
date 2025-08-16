import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import lottie from 'lottie-web';

@Component({
  selector: 'flaux-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class FlauxHomePage implements AfterViewInit {
  @ViewChild('lottieContainer', { static: true }) lottieContainer!: ElementRef;

  ngAfterViewInit(): void {
    lottie.loadAnimation({
      container: this.lottieContainer.nativeElement, // reference to the div
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/img/list-scroll-wide.json',
    });
  }
}
