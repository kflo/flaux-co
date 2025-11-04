import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type FlauxColor = 'highlight' | 'violet' | 'blue3' | 'blue2' | 'blue' | 'purple' | 'pink' | 'yellow' | 'orange' | 'salmon';

const FLAUX_COLORS: Record<FlauxColor, string> = {
	highlight: '#97deff',
	violet: '#29319b',
	blue3: '#143456',
	blue2: '#2a6eb6',
	blue: '#2fb2e6',
	purple: '#9556a2',
	pink: '#dd569f',
	yellow: '#fce25d',
	orange: '#faaf53',
	salmon: '#f06b86'
};

@Component({
	selector: 'flaux-btn',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './flaux-btn.component.html',
	styleUrl: './flaux-btn.component.scss',
	host: {
		'[style.--height]': 'height',
		'[style.--bg-color]': 'bgColorValue'
	}
})
export class FlauxBtnComponent {
	@Input() routerLink?: string;
	@Input() height: string = '3em';
	@Input() set backgroundColor(color: FlauxColor) {
		this.bgColorValue = FLAUX_COLORS[color] || color;
	}

	bgColorValue: string = 'white';
}
