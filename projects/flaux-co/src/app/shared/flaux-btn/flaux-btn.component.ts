import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'flaux-btn',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './flaux-btn.component.html',
	styleUrl: './flaux-btn.component.scss',
})
export class FlauxBtnComponent {
	@Input() routerLink?: string;
}
