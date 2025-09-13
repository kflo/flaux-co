import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollFilterDirective } from '@app/directives/scroll-filter.directive';
import { FlauxSectionComponent } from '@app/shared/section/section.component';
import lottie from 'lottie-web';
import { FlauxFnComponent } from "@app/shared/fn/fn.component";

@Component({
  selector: 'cta-section',
  standalone: true,
  imports: [RouterLink, FlauxSectionComponent, FlauxFnComponent],
  templateUrl: './cta-section.component.html',
  styleUrls: ['./cta-section.component.scss'],
})
export class CtaSectionComponent {
  @ViewChild('lottieContainer', { static: true }) lottieContainer!: ElementRef;

  ngAfterViewInit(): void {
    lottie.loadAnimation({
      container: this.lottieContainer.nativeElement, // reference to the div
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/lottie/list-scroll-wide.json',
    });
  }

  scrollFilterFn = (visible: number) => {
    console.debug({ visible });
    return `hue-rotate(${visible * 180}deg) invert(${visible})`;
  };
}
