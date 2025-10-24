import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostBinding,
	Input,
	OnDestroy,
	ViewChild
} from '@angular/core';
import { environment } from 'projects/flaux-co/environments/environment';

@Component({
	selector: 'flaux-bg-video',
	standalone: true,
	templateUrl: './flaux-bg-video.component.html',
	styleUrl: './flaux-bg-video.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlauxBgVideoComponent implements AfterViewInit, OnDestroy {

	@Input() vignette = false;
	@Input() relative = false;
	@Input() local = false;
	@Input() name = '';
	@Input() threshold = 0.25; // How much of the video should be visible before playing
	@Input() opacity = 1;
	@Input() vignettePosition = '50%'; // Position of the vignette gradient center

	@ViewChild('videoElement', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;

	private intersectionObserver?: IntersectionObserver;

	@HostBinding('style.--vignette-position')
	get vignettePositionVar(): string {
		return this.vignettePosition;
	}

	get src() {
		return !this.local ? `${environment.r2BucketUrl}vid/${this.name}.mp4` : `../../../assets/vid/${this.name}.mp4`;
	}

	ngAfterViewInit(): void {
		this.setupIntersectionObserver();
	}

	ngOnDestroy(): void {
		this.intersectionObserver?.disconnect();
	}

	private setupIntersectionObserver(): void {
		const options: IntersectionObserverInit = {
			threshold: this.threshold,
			rootMargin: '0px'
		};

		this.intersectionObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					this.playVideo();
				} else {
					this.pauseVideo();
				}
			});
		}, options);

		this.intersectionObserver.observe(this.videoRef.nativeElement);
	}

	private async playVideo(): Promise<void> {
		const video = this.videoRef.nativeElement;

		if (!video) return;

		// Ensure video is muted (required for autoplay in most browsers)
		video.muted = true;

		try {
			// Wait for video to be ready if needed
			if (video.readyState < 2) {
				await new Promise<void>((resolve) => {
					video.addEventListener('canplay', () => resolve(), { once: true });
				});
			}

			await video.play();
			console.log('Video playing');
		} catch (error) {
			console.warn('Video play failed:', error);
		}
	}

	private pauseVideo(): void {
		const video = this.videoRef.nativeElement;

		if (video && !video.paused) {
			video.pause();
			console.log('Video paused');
		}
	}
}
