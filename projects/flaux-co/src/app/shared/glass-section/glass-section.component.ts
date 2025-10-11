import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnInit,
	OnDestroy
} from '@angular/core';
import { BlobBackdropComponent } from "../blob-backdrop";

@Component({
	selector: 'flaux-glass-section',
	standalone: true,
	templateUrl: './glass-section.component.html',
	styleUrl: './glass-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [BlobBackdropComponent]
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

	private intervalId?: number;

	constructor(private cdr: ChangeDetectorRef) {}

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

	private startCarousel() {
		this.intervalId = window.setInterval(() => {
			if (this.imageUrls && this.imageUrls.length > 0) {
				this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
				this.cdr.markForCheck();
			}
		}, 4000);
	}

	get currentImageUrl(): string {
		if (this.imageUrls && this.imageUrls.length > 0) {
			return this.imageUrls[this.currentImageIndex];
		}
		return this.imageUrl || '';
	}

}
