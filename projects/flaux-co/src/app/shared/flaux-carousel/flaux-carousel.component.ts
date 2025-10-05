import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle } from '@angular/common';
// import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import { FlauxBtnComponent } from "../flaux-btn/flaux-btn.component";

export interface CarouselItem {
	id: number;
	text?: string | null;
	imageUrl?: string;
	heading: string;
	subheading?: string;
	linkUrl?: string | null;
}

/**
 * Arc-based carousel component that displays items fanning out from top center.
 * Creates an arc where items are positioned symmetrically around the top center point.
 * Features:
 * - Single radius for arc curvature
 * - Fan-out layout from top center
 * - Configurable arc span (default 120°)
 * - Adjustable spacing between items
 * - Edge handling: first element can go to last, last can go to first
 * - Center element is highlighted and featured
 */

@Component({
	standalone: true,
	selector: 'flaux-carousel',
	templateUrl: './flaux-carousel.component.html',
	imports: [NgStyle, MatButtonModule, MatIconModule, MatRippleModule, FlauxBtnComponent],
	styleUrls: ['./flaux-carousel.component.scss']
})
export class FlauxCarouselComponent implements OnInit {
	@Input() items: CarouselItem[] = [];
	@Input() radius: number = 6; // single radius for arc in em
	@Input() arcSpan: number = 120; // arc span in degrees (default 120°)
	@Input() itemSpacing: number = 1; // spacing multiplier between items
	@Input() showControls: boolean = true;

	public itemElements: { item: CarouselItem, id: string, positionIndex: number }[] = [];
	private sectionDeg: number = 0;
	private radianSectionDeg: number = 0;
	private isAnimating: boolean = false;
	centerTop = 0;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		// Calculate spacing between items on the arc
		const totalSpan = this.arcSpan * this.itemSpacing;
		this.sectionDeg = this.items.length > 1 ? totalSpan / (this.items.length - 1) : 0;
		this.radianSectionDeg = this.sectionDeg * Math.PI / 180;

		// Create stable element objects with unique IDs and initial positions
		this.itemElements = this.items.map((item, index) => ({
			item,
			id: `item-${index}-${item.id || index}`,
			positionIndex: index // This tracks where on the arc this element should be
		}));
	}

	get heightOffset(): number {
		const res = Math.abs(this.radius * Math.cos(this.radianSectionDeg));
		console.log(res, this.radius);
		return res + this.radius;
	}

	private getPositionCoords(positionIndex: number): { top: number; left: number } {
		// Create an arc that fans out symmetrically from top center
		// Center the arc around the top (90°) by spanning equally left and right
		const isEven = this.items.length % 2 === 0;
		let startAngle = -(this.arcSpan / 2); // Start from left side of arc
		if (isEven) startAngle -= this.sectionDeg/2;
		const angle = (startAngle + (this.sectionDeg * positionIndex)) * Math.PI / 180; // Convert to radians

		// Position items along the arc fanning out from top center
		return {
			top: -this.radius * Math.cos(angle), // Use cosine for vertical positioning from top
			left: this.radius * Math.sin(angle)  // Use sine for horizontal positioning
		};
	}

	public turnRight(): void {
		if (this.isAnimating) return;
		this.isAnimating = true;

		// For arc: move elements right, handle edge cases
		this.itemElements.forEach(element => {
			if (element.positionIndex === 0) {
				// First element can go to second position or last
				element.positionIndex = this.items.length - 1;
			} else {
				element.positionIndex = element.positionIndex - 1;
			}
		});

		this.cdr.markForCheck();

		// Reset animation flag after transition completes
		setTimeout(() => {
			this.isAnimating = false;
		}, 500);
	}

	get topmostItem(): CarouselItem | null {
		const centerElement = this.itemElements.find(el => this.isCenterElement(el));
		return centerElement ? centerElement.item : null;
	}

	public isCenterElement(element: { item: any, id: string, positionIndex: number }): boolean {
		// Center element is at the middle of the arc
		const centerIndex = Math.floor(this.items.length / 2);
		return element.positionIndex === centerIndex;
	}

	public turnLeft(): void {
		if (this.isAnimating) return;
		this.isAnimating = true;

		// For arc: move elements left, handle edge cases
		this.itemElements.forEach(element => {
			if (element.positionIndex === this.items.length - 1) {
				// Last element can go to penultimate position or first
				element.positionIndex = 0;
			} else {
				element.positionIndex = element.positionIndex + 1;
			}
		});

		this.cdr.markForCheck();

		// Reset animation flag after transition completes
		setTimeout(() => {
			this.isAnimating = false;
		}, 500);
	}

	public getItemStyle(element: { item: any, id: string, positionIndex: number }): any {
		const position = this.getPositionCoords(element.positionIndex);
		const isCenterElement = this.isCenterElement(element);
		const scale = isCenterElement ? 1 : 0.66;
		if (isCenterElement) {
			this.centerTop = -position.top;
		}

		// Position relative to center of carousel-wrapper using em units
		return {
			top: `calc(50% + ${position.top}em)`,
			left: `calc(50% + ${position.left}em)`,
			transform: `scale(${scale})`,
			zIndex: isCenterElement ? 10 : 1
		};
	}

	public isTopElement(element: { item: any, id: string, positionIndex: number }): boolean {
		return this.isCenterElement(element);
	}

	public isLastItem(element: { item: any, id: string, positionIndex: number }): boolean {
		return element.positionIndex === this.items.length - 1;
	}

	public isFirstItem(element: { item: any, id: string, positionIndex: number }): boolean {
		return element.positionIndex === 0;
	}

	public getButtonStyle(isLeft: boolean): any {
		const buttonRadius = this.radius * 0.6;
		return {
			'border-radius': isLeft
				? `${buttonRadius}em 1.25em 1.25em ${buttonRadius}em`
				: `1.25em ${buttonRadius}em ${buttonRadius}em 1.25em`,
			height: `${this.radius * 1.2}em`
		};
	}
}
