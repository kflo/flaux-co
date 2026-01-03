import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';

export type FlauxColor = 'highlight' | 'violet' | 'blue3' | 'blue2' | 'blue' | 'purple' | 'pink' | 'yellow' | 'orange' | 'salmon';

const FLAUX_COLORS: Record<FlauxColor, { hex: string; hue: number }> = {
	highlight: {
		hex: '#97deff',
		hue: 190
	},
	violet: {
		hex: '#29319b',
		hue: 233
	},
	blue3: {
		hex: '#143456',
		hue: 207
	},
	blue2: {
		hex: '#2a6eb6',
		hue: 208
	},
	blue: {
		hex: '#2fb2e6',
		hue: 195
	},
	purple: {
		hex: '#9556a2',
		hue: 284
	},
	pink: {
		hex: '#dd569f',
		hue: 330
	},
	yellow: {
		hex: '#fce25d',
		hue: 49
	},
	orange: {
		hex: '#faaf53',
		hue: 35
	},
	salmon: {
		hex: '#f06b86',
		hue: 344
	}
};

@Component({
	selector: 'flaux-btn',
	standalone: true,
	imports: [RouterLink, NgTemplateOutlet],
	templateUrl: './flaux-btn.component.html',
	styleUrl: './flaux-btn.component.scss',
	host: {
		'[style.--height]': 'height',
		'[style.--width]': 'width',
		'[style.--backgroundColor]': 'bgColorValue',
		'[style.filter]': 'hueRotate ? "hue-rotate(" + hueRotate + ")" : null',
		'[class.pulse]': 'pulse'
	}
})
export class FlauxBtnComponent {
	@Input() routerLink?: string;
	@Input() fragment?: string;
	@Input() href?: string;
	@Input() target?: string;
	@Input() height: string = '3em';
	@Input() width: string = 'auto';
	@Input() hueRotate?: string;
	@Input() pulse: boolean = false;
	@Input() set backgroundColor(color: FlauxColor) {
		const colorValue = FLAUX_COLORS[color];
		this.bgColorValue = colorValue ? `${colorValue.hue}deg` : '0deg';
	}

	bgColorValue: string = '0deg';
}
