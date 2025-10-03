import { Component, Input } from '@angular/core';

@Component({
	selector: 'flaux-fn',
	standalone: true,
	templateUrl: './fn.component.html',
	styleUrls: ['./fn.component.scss']
})
export class FlauxFnComponent {
  @Input() italicText: string = '';
  @Input() fnText: string = '';
}
