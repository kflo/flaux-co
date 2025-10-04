import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'flaux-section',
	standalone: true,
	templateUrl: './section.component.html',
	styleUrl: './section.component.scss'
})
export class FlauxSectionComponent {

	@Input()
	@HostBinding('style.height')
		height: string = '27em';

	@Input()
	@HostBinding('style.padding-inline')
		inlinePadding: string = '2em';

	@Input()
	@HostBinding('style.padding-block')
		blockPadding: string = '2em';

}
