import {
	ChangeDetectionStrategy,
	Component,
	ChangeDetectorRef,
	OnInit,
	OnDestroy,
	HostListener,
	Input,
	TemplateRef,
	ContentChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'flaux-quote-carousel',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './quote-carousel.component.html',
	styleUrl: './quote-carousel.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlauxQuoteCarouselComponent<T = any> implements OnInit, OnDestroy {
	@Input() items: ReadonlyArray<T> = [];
	@Input() intervalMs = 13000;
	@Input() ariaLabel = 'Carousel';
	@Input() slideAriaDescription = 'slide';
	@Input() showNavigation = true;

	@ContentChild('slideTemplate', {
		static: false
	}) slideTemplate?: TemplateRef<any>;

	current = 0;
	private intervalId: any;
	private isPaused = false;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.startAutoPlay();
	}

	ngOnDestroy(): void {
		this.clearTimer();
	}

	private startAutoPlay(): void {
		if (this.items.length <= 1) return;
		this.clearTimer();
		this.intervalId = setInterval(() => {
			if (!this.isPaused) {
				this.next(false);
			}
		}, this.intervalMs);
	}

	private clearTimer(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	pause(): void {
		this.isPaused = true;
	}

	resume(): void {
		this.isPaused = false;
	}

	next(manual = true): void {
		if (!this.items.length) return;
		this.current = (this.current + 1) % this.items.length;
		if (manual) this.restartAfterManual();
		this.cdr.markForCheck();
	}

	prev(): void {
		if (!this.items.length) return;
		this.current = (this.current - 1 + this.items.length) % this.items.length;
		this.restartAfterManual();
		this.cdr.markForCheck();
	}

	goTo(index: number): void {
		if (index < 0 || index >= this.items.length) return;
		this.current = index;
		this.restartAfterManual();
		this.cdr.markForCheck();
	}

	trackByIndex(i: number): number {
		return i;
	}

	private restartAfterManual(): void {
		// On manual interaction, pause briefly then resume autoplay for better UX
		this.isPaused = true;
		setTimeout(() => {
			this.isPaused = false;
		}, 1500);
	}

	@HostListener('keydown', ['$event'])
	handleKey(e: KeyboardEvent): void {
		if (e.key === 'ArrowRight') {
			this.next();
			e.preventDefault();
		} else if (e.key === 'ArrowLeft') {
			this.prev();
			e.preventDefault();
		}
	}
}
