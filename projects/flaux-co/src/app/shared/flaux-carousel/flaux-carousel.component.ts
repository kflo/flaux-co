import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	standalone: true,
	selector: 'flaux-carousel',
	templateUrl: './flaux-carousel.component.html',
	imports: [NgStyle, MatButtonModule, MatIconModule],
	styleUrls: ['./flaux-carousel.component.scss']
})
export class FlauxCarouselComponent implements OnInit {
	@Input() items: any[] = ['1', '2', '3', '4', '5'];
	@Input() radius: number = 160;
	@Input() showControls: boolean = true;

	public itemElements: { item: any, id: string, positionIndex: number }[] = [];
	private sectionDeg: number = 0;
	private radianSectionDeg: number = 0;
	private isAnimating: boolean = false;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.sectionDeg = 360 / this.items.length;
		this.radianSectionDeg = this.sectionDeg * Math.PI * 2 / 360;

		// Create stable element objects with unique IDs and initial positions
		this.itemElements = this.items.map((item, index) => ({
			item,
			id: `item-${index}-${item}`,
			positionIndex: index // This tracks where in the circle this element should be
		}));
	}

	private getPositionCoords(positionIndex: number): { top: number; left: number } {
		return {
			top: this.radius * Math.sin(this.radianSectionDeg * positionIndex - 1.5708),
			left: this.radius * Math.cos(this.radianSectionDeg * positionIndex - 1.5708)
		};
	}

	public turnRight(): void {
		if (this.isAnimating) return;
		this.isAnimating = true;

		// Shift all position indices - don't change array order!
		this.itemElements.forEach(element => {
			element.positionIndex = (element.positionIndex - 1 + this.items.length) % this.items.length;
		});

		this.cdr.markForCheck();

		// Reset animation flag after transition completes
		setTimeout(() => {
			this.isAnimating = false;
		}, 500);
	}

	public turnLeft(): void {
		if (this.isAnimating) return;
		this.isAnimating = true;

		// Shift all position indices - don't change array order!
		this.itemElements.forEach(element => {
			element.positionIndex = (element.positionIndex + 1) % this.items.length;
		});

		this.cdr.markForCheck();

		// Reset animation flag after transition completes
		setTimeout(() => {
			this.isAnimating = false;
		}, 500);
	}

	public getItemStyle(element: { item: any, id: string, positionIndex: number }): any {
		const position = this.getPositionCoords(element.positionIndex);
		return {
			top: position.top + 'px',
			left: position.left + 'px'
		};
	}
}
