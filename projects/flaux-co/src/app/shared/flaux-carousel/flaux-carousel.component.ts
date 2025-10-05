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
 * Linear carousel component that displays items in a horizontal line.
 * Features:
 * - Linear horizontal layout
 * - Configurable item spacing
 * - Smooth transitions between items
 * - Wrap-around with invisible transitions (first to last, last to first)
 * - Center element is highlighted and featured
 * - Responsive item sizing
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
	@Input() itemWidth: number = 4; // width of each item in rem
	@Input() itemSpacing: number = 2; // spacing between items in rem
	@Input() showControls: boolean = true;
	@Input() visibleItems: number = 5; // number of items visible at once

	public itemElements: { item: CarouselItem, id: string, positionIndex: number }[] = [];
	private isAnimating: boolean = false;
	private wrapAroundElements: Set<string> = new Set(); // Track elements in wrap-around transition
	public currentOffset: number = 0; // Current scroll offset

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		// Create stable element objects with unique IDs and initial positions
		this.itemElements = this.items.map((item, index) => ({
			item,
			id: `item-${index}-${item.id || index}`,
			positionIndex: index // This tracks the linear position
		}));

		// Center the initial view on the middle item
		const centerIndex = Math.floor(this.items.length / 2);
		this.currentOffset = -centerIndex * (this.itemWidth + this.itemSpacing);

		console.log(this.itemWidth, this.itemSpacing);

	}

	public turnRight(): void {
		if (this.isAnimating) return;
		this.isAnimating = true;

		// Clear previous wrap-around elements
		this.wrapAroundElements.clear();

		// Move elements right in linear fashion
		this.itemElements.forEach(element => {
			if (element.positionIndex === 0) {
				// First element wrapping to last - hide during transition
				this.wrapAroundElements.add(element.id);
				element.positionIndex = this.items.length - 1;
			} else {
				element.positionIndex = element.positionIndex - 1;
			}
		});

		this.cdr.markForCheck();

		// Reset animation flag and clear wrap-around elements after transition completes
		setTimeout(() => {
			this.isAnimating = false;
			this.wrapAroundElements.clear();
			this.cdr.markForCheck();
		}, 500);
	}

	get featuredItem(): CarouselItem | null {
		const centerElement = this.itemElements.find(el => this.isCenterElement(el));
		return centerElement ? centerElement.item : null;
	}

	public isCenterElement(element: { item: any, id: string, positionIndex: number }): boolean {
		// Center element in linear layout
		const centerIndex = Math.floor(this.visibleItems / 2);
		return element.positionIndex === centerIndex;
	}

	public turnLeft(): void {
		if (this.isAnimating) return;
		this.isAnimating = true;

		// Clear previous wrap-around elements
		this.wrapAroundElements.clear();

		// Move elements left in linear fashion
		this.itemElements.forEach(element => {
			if (element.positionIndex === this.items.length - 1) {
				// Last element wrapping to first - hide during transition
				this.wrapAroundElements.add(element.id);
				element.positionIndex = 0;
			} else {
				element.positionIndex = element.positionIndex + 1;
			}
		});

		this.cdr.markForCheck();

		// Reset animation flag and clear wrap-around elements after transition completes
		setTimeout(() => {
			this.isAnimating = false;
			this.wrapAroundElements.clear();
			this.cdr.markForCheck();
		}, 500);
	}

	public getItemStyle(element: { item: any, id: string, positionIndex: number }): any {
		const isCenterElement = this.isCenterElement(element);
		const scale = isCenterElement ? 1 : 0.66;

		// Calculate offset relative to center position
		const centerIndex = Math.floor(this.visibleItems / 2);
		const relativePosition = element.positionIndex - centerIndex;
		const offset = relativePosition * (this.itemWidth + this.itemSpacing);

		// Position items in a linear horizontal layout
		// Negative for left of center, positive for right of center
		return {
			transform: `translateX(${offset}em) scale(${scale})`,
			zIndex: isCenterElement ? 10 : 1,
			opacity: this.isItemVisible(element.positionIndex) ? 1 : 0.3
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

	public isWrapAroundElement(element: { item: any, id: string, positionIndex: number }): boolean {
		return this.wrapAroundElements.has(element.id);
	}

	public isItemVisible(positionIndex: number): boolean {
		// Check if item is within visible range
		const centerIndex = Math.floor(this.visibleItems / 2);
		const minVisible = centerIndex - Math.floor(this.visibleItems / 2);
		const maxVisible = centerIndex + Math.floor(this.visibleItems / 2);
		return positionIndex >= minVisible && positionIndex <= maxVisible;
	}

	public getButtonStyle(): any {
		return {
			'border-radius': '0.5rem',
			height: '3em',
			width: '3em'
		};
	}
}
