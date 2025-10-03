import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { FlauxBtnBowedComponent } from "../flaux-btn-bowed/flaux-btn-bowed.component";

export interface CarouselItem {
	id: number;
	text?: string | null;
	imageUrl?: string;
	heading: string;
	subheading?: string;
	linkUrl?: string | null;
}

@Component({
	standalone: true,
	selector: 'flaux-carousel',
	templateUrl: './flaux-carousel.component.html',
	imports: [NgStyle, MatButtonModule, MatIconModule, MatRippleModule, FlauxBtnBowedComponent, FlauxBtnBowedComponent],
	styleUrls: ['./flaux-carousel.component.scss']
})
export class FlauxCarouselComponent implements OnInit {
	@Input() items: CarouselItem[] = [];
	@Input() radiusX: number = 240; // horizontal radius (wider)
	@Input() radiusY: number = 120; // vertical radius (narrower)
	@Input() showControls: boolean = true;

	// Deprecated: kept for backward compatibility
	@Input() set radius(value: number) {
		this.radiusX = value * 1.5; // Make it wider
		this.radiusY = value * 0.75; // Make it narrower
	}

	public itemElements: { item: CarouselItem, id: string, positionIndex: number }[] = [];
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
		const angle = this.radianSectionDeg * positionIndex - 1.5708; // -1.5708 starts at top
		return {
			top: this.radiusY * Math.sin(angle),
			left: this.radiusX * Math.cos(angle)
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

	get topmostItem(): CarouselItem | null {
		const topElement = this.itemElements.find(el => el.positionIndex === 0);
		return topElement ? topElement.item : null;
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
		const isTopElement = element.positionIndex === 0;
		const scale = isTopElement ? 1 : 0.5;

		return {
			top: position.top + 'px',
			left: position.left + 'px',
			transform: `scale(${scale})`,
			zIndex: isTopElement ? 10 : 1
		};
	}

	public isTopElement(element: { item: any, id: string, positionIndex: number }): boolean {
		return element.positionIndex === 0;
	}

	public getButtonStyle(isLeft: boolean): any {
		const buttonRadius = this.radiusY;
		return {
			'border-radius': isLeft
				? `${buttonRadius}px 20px 20px ${buttonRadius}px`
				: `20px ${buttonRadius}px ${buttonRadius}px 20px`,
			height: `${this.radiusY * 2}px`
		};
	}
}
