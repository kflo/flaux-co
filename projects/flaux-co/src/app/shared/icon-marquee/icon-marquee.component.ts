import {
	Component,
	Input,
	OnInit,
	ElementRef,
	Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-icon-marquee',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './icon-marquee.component.html',
	host: {
		'[style.--icon-size]': 'iconSize',
		'[style.--gap-size]': 'gapSize',
		'[style.--border-radius]': 'borderRadius',
		'[style.--overflow]': 'overflow'
	},
	styleUrl: './icon-marquee.component.scss',
})
export class IconMarqueeComponent implements OnInit {
	@Input() iconPath: string = '../../../../assets/img/icons/n8n/';
	@Input() animationSpeed: number = 60; // seconds for full cycle
	@Input() iconSize: string = '3em';
	@Input() gapSize: string = '0.5em';
	@Input() borderRadius: string = '10px';
	@Input() iconFiles: string[] = [];
	@Input() singleRow: boolean = false;
	@Input() overflow: boolean = false;

	constructor(private el: ElementRef, private renderer: Renderer2) {}

	// List of n8n integration icons


	// Split icons into two rows for better visual distribution
	row1Icons: string[] = [];
	row2Icons: string[] = [];

	ngOnInit() {
		const shuffledIcons = [...this.iconFiles].sort(() => Math.random() - 0.5);

		if (this.singleRow) {
			this.row1Icons = shuffledIcons;
			this.row2Icons = [];
		} else {
			const midPoint = Math.ceil(shuffledIcons.length / 2);
			this.row1Icons = shuffledIcons.slice(0, midPoint);
			this.row2Icons = shuffledIcons.slice(midPoint);
		}

		// Set CSS custom properties for styling
		this.renderer.setStyle(this.el.nativeElement, '--icon-size', this.iconSize);
		this.renderer.setStyle(this.el.nativeElement, '--gap-size', this.gapSize);
	}

	getIconPath(iconName: string): string {
		return `${this.iconPath}${iconName}`;
	}

	trackByIcon(index: number, icon: string): string {
		return icon;
	}
}
