import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnInit,
	OnDestroy,
	inject
} from '@angular/core';

type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

@Component({
	selector: 'flaux-blob-backdrop',
	templateUrl: './blob-backdrop.component.html',
	styleUrls: ['./blob-backdrop.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[style.--blob1]': 'deepestColor',
		'[style.--blob2]': 'primaryColor',
		'[style.--blob3]': 'foremostColor',
		'[style.--blob1-rotate]': 'blob1Rotate + "deg"',
		'[style.--blob1-scale]': 'blob1Scale',
		'[style.--blob2-rotate]': 'blob2Rotate + "deg"',
		'[style.--blob2-scale]': 'blob2Scale',
		'[style.--blob3-rotate]': 'blob3Rotate + "deg"',
		'[style.--blob3-scale]': 'blob3Scale',
		'[class.blob-3]': 'blobCount === 3',
		'[class.blob-2]': 'blobCount === 2',
		'[class.blob-1]': 'blobCount === 1',
		'[style.--changeOrigin]': 'changeOrigin',

	}
})
export class BlobBackdropComponent implements OnInit, OnDestroy {
	@Input() animate = true;
	@Input() interval = 7000;
  /** 1..3 (default 2) */
  @Input() blobCount: 1 | 2 | 3 = 2;
  @Input() changeOrigin = 'center center';
  /** middle blob color (CSS color)… e.g. '#4f7cff' or 'rgb(80,120,255)' */
  @Input() primaryColor: string = '#2b3a84';
  /** array of image URLs for carousel */
  @Input() imageUrls: string[] = [];
  /** array of image labels for carousel */
  @Input() imageLabels: string[] = [];
  /** shown on top of blobs (legacy support) */
  @Input() imageUrl = '';
  /** CSS object-fit for the image */
  @Input() imageResize: ObjectFit = 'cover';
  /** current image index */
  currentImageIndex = 0;
  /** optional alt text */
  @Input() alt = 'Digital Solutions Image Carousel';
  /** Blob 1 rotation in degrees */
  @Input() blob1Rotate = -90;
  /** Blob 1 scale */
  @Input() blob1Scale = 2.1;
  /** Blob 2 rotation in degrees */
  @Input() blob2Rotate = -90;
  /** Blob 2 scale */
  @Input() blob2Scale = 2.1;
  /** Blob 3 rotation in degrees */
  @Input() blob3Rotate = -90;
  /** Blob 3 scale */
  @Input() blob3Scale = 2.0;

  /** Position of the blob: 'left' or 'right' */
  //   @Input() position: 'left' | 'right' = 'right';

  /** Show/hide controls */
  showControls = true;

  private intervalId?: number;
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
  	if (this.imageUrls.length > 1 && this.animate) {
  		this.startCarousel(this.interval);
  	}
  }

  ngOnDestroy() {
  	if (this.intervalId) {
  		clearInterval(this.intervalId);
  	}
  }

  private startCarousel(interval: number) {
  	this.intervalId = window.setInterval(() => {
  		this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
  		this.cdr.markForCheck();
  	}, interval);
  }

  get currentImageUrl(): string {
  	if (this.imageUrls.length > 0) {
  		return this.imageUrls[this.currentImageIndex];
  	}
  	return this.imageUrl;
  }

  toggleControls() {
  	this.showControls = !this.showControls;
  }

  get deepestColor(): string {
  	return adjustColor(this.primaryColor, 70, 10);
  }

  get foremostColor(): string {
  	return this.blobCount === 3 ? '#111111' : 'transparent';
  }
}

// ! TODO: replace adjust logic with simple desaturation and brightness multipliers
// ! TODO: seeded random variations based on input color to avoid exact matches, though still deterministic
// ! TOOD: small mode,

/** Adjust color saturation and brightness */
function adjustColor(color: string, saturation: number, brightness: number): string {
	const el = document.createElement('div');
	el.style.color = color;
	document.body.appendChild(el);
	const rgb = getComputedStyle(el).color;
	el.remove();

	const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
	if (!m) return color; // fallback to original color

	const r = +m[1] / 255, g = +m[2] / 255, b = +m[3] / 255;
	const max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h = 0, s = 0;
	const l = (max + min) / 2;
	const d = max - min;

	if (d !== 0) {
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h *= 60;
	}

	const newS = Math.max(0, Math.min(1, s * saturation));
	const newL = Math.max(0, Math.min(1, l * brightness));

	return `hsl(${Math.round(h)}, ${Math.round(newS * 100)}%, ${Math.round(newL * 100)}%)`;
}
