import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'flaux-bg2',
  imports: [],
  standalone: true,
  templateUrl: './bg2.component.html',
  styleUrl: './bg2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bg2Component implements AfterViewInit {
  @ViewChild('bgVideo', { static: false })
  private bgVideoRef?: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.bgVideoRef?.nativeElement;
    if (!video) return;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          // Some browsers may still block autoplay; ensure muted and retry once.
          video.muted = true;
          video.play().catch(() => {
            // Swallow; user interaction may be required depending on settings.
          });
        });
      }
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      const onCanPlay = () => {
        video.removeEventListener('canplay', onCanPlay);
        tryPlay();
      };
      video.addEventListener('canplay', onCanPlay);
    }
  }
}
