import {
	Component,
	Input,
	OnInit,
	OnDestroy,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	signal,
	computed
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type StaggerFrom = 'first' | 'last' | 'center' | 'random' | number;
export type SplitBy = 'characters' | 'words' | 'lines' | string;

@Component({
	selector: 'flaux-rotating-text',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './flaux-rotating-text.component.html',
	styleUrls: ['./flaux-rotating-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlauxRotatingTextComponent implements OnInit, OnDestroy {
	@Input() texts: string[] = [];
	@Input() rotationInterval = 12000;
	@Input() staggerDuration = 0;
	@Input() staggerFrom: StaggerFrom = 'first';
	@Input() loop = true;
	@Input() auto = true;
	@Input() splitBy: SplitBy = 'characters';
	@Input() animationDuration = 500;
	@Input() animationEasing = 'ease';
	@Input() letterSpacing = '0.0em';

	currentTextIndex = signal(0);
	progressPercent = signal(100);
	private intervalId: any = null;
	private animationFrameId: any = null;
	private rotationStartTime = 0;

	elements = computed(() => {
		const currentText = this.texts[this.currentTextIndex()];
		if (!currentText) return [];

		if (this.splitBy === 'characters') {
			// Split by words but preserve spaces
			const parts = currentText.split(/(\s+)/);
			return parts.map((part) => {
				const isSpace = /^\s+$/.test(part);
				return {
					characters: isSpace ? [part] : this.splitIntoCharacters(part),
					needsSpace: false // We're already including spaces in characters
				};
			});
		}

		if (this.splitBy === 'words') {
			return currentText.split(' ').map((word, i, arr) => ({
				characters: [word],
				needsSpace: i !== arr.length - 1
			}));
		}

		if (this.splitBy === 'lines') {
			return currentText.split('\n').map((line, i, arr) => ({
				characters: [line],
				needsSpace: i !== arr.length - 1
			}));
		}

		return currentText.split(this.splitBy).map((part, i, arr) => ({
			characters: [part],
			needsSpace: i !== arr.length - 1
		}));
	});

	get currentText(): string {
		return this.texts[this.currentTextIndex()] || '';
	}

	get isLines(): boolean {
		return this.splitBy === 'lines';
	}

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		if (this.auto && this.texts.length > 1) {
			this.startRotation();
		}
	}

	ngOnDestroy(): void {
		this.stopRotation();
	}

	private splitIntoCharacters(text: string): string[] {
		if (typeof Intl !== 'undefined' && Intl.Segmenter) {
			const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
			return Array.from(segmenter.segment(text), segment => segment.segment);
		}
		return Array.from(text);
	}

	getStaggerDelay(wordIndex: number, charIndex: number): string {
		const elements = this.elements();
		const previousCharsCount = elements
			.slice(0, wordIndex)
			.reduce((sum, word) => sum + word.characters.length, 0);
		const totalChars = elements.reduce((sum, word) => sum + word.characters.length, 0);
		const index = previousCharsCount + charIndex;

		let delay: number;
		if (this.staggerFrom === 'first') {
			delay = index * this.staggerDuration;
		} else if (this.staggerFrom === 'last') {
			delay = (totalChars - 1 - index) * this.staggerDuration;
		} else if (this.staggerFrom === 'center') {
			const center = Math.floor(totalChars / 2);
			delay = Math.abs(center - index) * this.staggerDuration;
		} else if (this.staggerFrom === 'random') {
			const randomIndex = Math.floor(Math.random() * totalChars);
			delay = Math.abs(randomIndex - index) * this.staggerDuration;
		} else {
			delay = Math.abs((this.staggerFrom as number) - index) * this.staggerDuration;
		}

		return `${delay}ms`;
	}

	private startRotation(): void {
		this.rotationStartTime = performance.now();
		this.animateProgress();
		this.intervalId = setInterval(() => {
			this.next();
			this.rotationStartTime = performance.now();
			this.animateProgress();
		}, this.rotationInterval);
	}

	private stopRotation(): void {
		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
		if (this.animationFrameId !== null) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}
	}

	private animateProgress(): void {
		const update = () => {
			const elapsed = performance.now() - this.rotationStartTime;
			const progress = Math.min(100, (elapsed / this.rotationInterval) * 100);
			// Invert progress: 100% at start, 0% at end
			this.progressPercent.set(100 - progress);

			if (progress < 100) {
				this.animationFrameId = requestAnimationFrame(update);
			}
		};
		this.animationFrameId = requestAnimationFrame(update);
	}

	next(): void {
		if (this.texts.length === 0) return;

		// Pick a random index different from current one
		let nextIndex = Math.floor(Math.random() * this.texts.length);

		// Ensure we don't pick the same text twice in a row
		while (nextIndex === this.currentTextIndex() && this.texts.length > 1) {
			nextIndex = Math.floor(Math.random() * this.texts.length);
		}

		this.currentTextIndex.set(nextIndex);
		this.cdr.markForCheck();
	}

	previous(): void {
		const prevIndex = this.currentTextIndex() === 0
			? (this.loop ? this.texts.length - 1 : this.currentTextIndex())
			: this.currentTextIndex() - 1;

		if (prevIndex !== this.currentTextIndex()) {
			this.currentTextIndex.set(prevIndex);
			this.cdr.markForCheck();
		}
	}

	jumpTo(index: number): void {
		const validIndex = Math.max(0, Math.min(index, this.texts.length - 1));
		if (validIndex !== this.currentTextIndex()) {
			this.currentTextIndex.set(validIndex);
			this.cdr.markForCheck();
		}
	}

	reset(): void {
		if (this.currentTextIndex() !== 0) {
			this.currentTextIndex.set(0);
			this.cdr.markForCheck();
		}
	}

	onHover(): void {
		// Stop auto-rotation temporarily
		this.stopRotation();
		// Advance to next text
		this.next();
		// Restart auto-rotation if it was enabled
		if (this.auto && this.texts.length > 1) {
			this.startRotation();
		}
	}
}
