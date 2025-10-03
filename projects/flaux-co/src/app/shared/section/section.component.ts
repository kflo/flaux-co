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
		height: string = '50vh';

	@Input()
	@HostBinding('style.padding-inline')
		inlinePadding: string = '5vw';

}
