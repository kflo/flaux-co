import {Component, Input} from '@angular/core';

@Component({
	selector: 'flaux-fn',
	standalone: true,
	templateUrl: './flaux-fn.component.html',
	styleUrls: ['./flaux-fn.component.scss']
})
export class FlauxFnComponent {
	@Input() italicText: string = '';
	@Input() fnText: string = '';
}
