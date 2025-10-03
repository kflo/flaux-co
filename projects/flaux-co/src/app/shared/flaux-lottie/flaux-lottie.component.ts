import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnDestroy,
	ViewChild
} from '@angular/core';
import lottie, { AnimationItem } from 'lottie-web';

@Component({
	selector: 'flaux-lottie',
	standalone: true,
	templateUrl: './flaux-lottie.component.html',
	styleUrl: './flaux-lottie.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlauxLottieComponent implements AfterViewInit, OnDestroy {
	@Input() name!: string;
	@Input() renderer: 'svg' | 'canvas' | 'html' = 'svg';
	@Input() loop = true;
	@Input() autoplay = true;
	@Input() width?: string;
	@Input() height?: string;
	@Input() maskFade = false; // Apply the mask fade effect
	@Input() mixBlendMode?: string; // CSS mix-blend-mode value

	@ViewChild('lottieContainer', { static: true }) lottieContainer!: ElementRef<HTMLDivElement>;

	private animation?: AnimationItem;

	ngAfterViewInit(): void {
		this.loadAnimation();
	}

	ngOnDestroy(): void {
		this.animation?.destroy();
	}

	private loadAnimation(): void {
		if (!this.name) {
			console.warn('FlauxLottieComponent: animationPath is required');
			return;
		}

		this.animation = lottie.loadAnimation({
			container: this.lottieContainer.nativeElement,
			renderer: this.renderer,
			loop: this.loop,
			autoplay: this.autoplay,
			path: `assets/lottie/${this.name}.json`,
		});
	}

	// Public methods to control animation
	play(): void {
		this.animation?.play();
	}

	pause(): void {
		this.animation?.pause();
	}

	stop(): void {
		this.animation?.stop();
	}

	setSpeed(speed: number): void {
		this.animation?.setSpeed(speed);
	}
}
