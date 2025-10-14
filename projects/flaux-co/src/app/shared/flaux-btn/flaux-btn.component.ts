import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'flaux-btn',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './flaux-btn.component.html',
	styleUrl: './flaux-btn.component.scss',
	host: {
		'[style.--height]': 'height'
	}
})
export class FlauxBtnComponent {
	@Input() routerLink?: string;
	@Input() height: string = '3em';
}
