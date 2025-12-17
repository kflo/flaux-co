import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnInit,
	OnDestroy,
	inject,
} from '@angular/core';
import { BlobBackdropComponent } from "../blob-backdrop";
import { NgClass } from '@angular/common';

@Component({
	selector: 'flaux-glass-section',
	standalone: true,
	templateUrl: './glass-section.component.html',
	styleUrl: './glass-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [BlobBackdropComponent, NgClass]
})
export class FlauxGlassSectionComponent implements OnInit, OnDestroy {

	@Input() imageUrls?: string[];
	@Input() imageUrl?: string; // Legacy support for single image
	@Input() imageAlt?: string = '';
	@Input() title?: string;
	@Input() titleIcon?: string;
	@Input() titleIconAlt?: string = '';
	@Input() titleSpacing?: boolean = false; // Optional spacing between title and icon
	@Input() description?: string;
	@Input() blobBackdrop?: boolean = false;
	@Input() imagePosition: 'left' | 'right' = 'left';

	/** current image index */
	currentImageIndex = 0;
	/** hover state for pausing carousel */
	isHovered = false;

	private intervalId?: number;
	private cdr = inject(ChangeDetectorRef);

	ngOnInit() {
		if (this.imageUrls && this.imageUrls.length > 1) {
			this.startCarousel();
		}
	}

	ngOnDestroy() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}

	private startCarousel(delay: number = 4000) {
		this.intervalId = window.setInterval(() => {
			if (this.imageUrls && this.imageUrls.length > 0) {
				this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
				this.cdr.markForCheck();
			}
		}, delay);
	}

	private stopCarousel() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = undefined;
		}
	}

	private resumeCarouselAfterHover() {
		// Start with a shorter delay (1 second) after mouse leave
		setTimeout(() => {
			if (!this.isHovered && this.imageUrls && this.imageUrls.length > 1) {
				// Advance to next image immediately
				this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
				this.cdr.markForCheck();
				// Then start normal 4-second interval
				this.startCarousel(4000);
			}
		}, 1000);
	}

	onImageHover(hovered: boolean) {
		this.isHovered = hovered;

		if (this.imageUrls && this.imageUrls.length > 1) {
			if (hovered) {
				// Pause the carousel
				this.stopCarousel();
			} else {
				// Resume the carousel with shorter initial delay
				this.resumeCarouselAfterHover();
			}
		}
	}

	get currentImageUrl(): string {
		if (this.imageUrls && this.imageUrls.length > 0) {
			return this.imageUrls[this.currentImageIndex];
		}
		return this.imageUrl || '';
	}

}
