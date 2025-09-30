import {
	ChangeDetectionStrategy, Component, ChangeDetectorRef, OnInit, OnDestroy, HostListener
} from '@angular/core';
import {FlauxSectionComponent} from "@app/shared/section/section.component";
import {FlauxQuoteHighlightComponent} from '@app/shared/quote-highlight/quote-highlight.component';
import {QUOTES, QuoteItem} from './quotes.data';

@Component({
	selector: 'features2-section',
	standalone: true,
	imports: [FlauxSectionComponent, FlauxQuoteHighlightComponent],
	templateUrl: './features2-section.component.html',
	styleUrl: './features2-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Features2SectionComponent implements OnInit, OnDestroy {
	readonly quotes: ReadonlyArray<QuoteItem> = QUOTES;

	current = 0;
	private intervalId: any;
	private readonly intervalMs = 10000;
	private isPaused = false;

	constructor (private cdr: ChangeDetectorRef) { }

	ngOnInit(): void {
		this.startAutoPlay();
	}

	ngOnDestroy(): void {
		this.clearTimer();
	}

	private startAutoPlay(): void {
		if (this.quotes.length <= 1) return;
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

	pause(): void {this.isPaused = true;}
	resume(): void {this.isPaused = false;}

	next(manual = true): void {
		if (!this.quotes.length) return;
		this.current = (this.current + 1) % this.quotes.length;
		if (manual) this.restartAfterManual();
		this.cdr.markForCheck();
	}

	prev(): void {
		if (!this.quotes.length) return;
		this.current = (this.current - 1 + this.quotes.length) % this.quotes.length;
		this.restartAfterManual();
		this.cdr.markForCheck();
	}

	goTo(index: number): void {
		if (index < 0 || index >= this.quotes.length) return;
		this.current = index;
		this.restartAfterManual();
		this.cdr.markForCheck();
	}

	trackByIndex(i: number): number {return i;}

	private restartAfterManual(): void {
		// On manual interaction, pause briefly then resume autoplay for better UX
		this.isPaused = true;
		setTimeout(() => {this.isPaused = false;}, 1500);
	}

	@HostListener('keydown', ['$event'])
	handleKey(e: KeyboardEvent): void {
		if (e.key === 'ArrowRight') {this.next(); e.preventDefault();}
		else if (e.key === 'ArrowLeft') {this.prev(); e.preventDefault();}
	}
}

// QuoteItem interface moved to quotes.data.ts
