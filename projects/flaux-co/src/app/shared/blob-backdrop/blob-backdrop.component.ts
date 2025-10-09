import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
	}
})
export class BlobBackdropComponent {
  /** 1..3 (default 2) */
  @Input() blobCount: 1 | 2 | 3 = 2;

  /** middle blob color (CSS color)… e.g. '#4f7cff' or 'rgb(80,120,255)' */
  @Input() primaryColor: string = '#2b3a84';

  /** shown on top of blobs */
  @Input() imageUrl = '';

  /** CSS object-fit for the image */
  @Input() imageResize: ObjectFit = 'cover';

  /** optional alt text */
  @Input() alt = '';

  /** Blob 1 rotation in degrees */
  @Input() blob1Rotate = -132;

  /** Blob 1 scale */
  @Input() blob1Scale = 2.1;

  /** Blob 2 rotation in degrees */
  @Input() blob2Rotate = -115;

  /** Blob 2 scale */
  @Input() blob2Scale = 2.1;

  /** Blob 3 rotation in degrees */
  @Input() blob3Rotate = -95;

  /** Blob 3 scale */
  @Input() blob3Scale = 2.0;

  /** Show/hide controls */
  showControls = true;

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
