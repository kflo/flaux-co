// text-cycler.component.ts

import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
	selector: 'flaux-text-cycler',
	templateUrl: './text-cycler.component.html',
	styleUrls: ['./text-cycler.component.scss'],
	animations: [
		trigger('slideContainer', [
			transition(':increment', [
				style({ transform: 'translateY(0)' }),
				animate('800ms ease-in-out', style({ transform: 'translateY(-60px)' }))
			])
		])
	]
})
export class TextCyclerComponent implements OnInit, OnDestroy {
	public textItems: string[] = [
		'→ AI Agents',
		'→ Chatbots',
		'→ SEO',
		'→ SMS Marketing',
		'→ Logo Design',
		'→ Email Marketing',
		'→ AI Workflows'
	];

	public currentText: string = this.textItems[0];
	private currentIndex: number = 0;
	private intervalId: any;
	public animationState: number = 0;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		console.log('TextCycler initialized');
		// Start cycling through the text every 3 seconds
		this.intervalId = setInterval(() => {
			this.animationState++; // Trigger container animation
			this.cdr.markForCheck(); // Trigger change detection
			console.log('Animation state:', this.animationState);
		}, 3000);
	}

	ngOnDestroy(): void {
		// Clean up the interval
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}
}
