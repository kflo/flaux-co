import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'flaux-section',
	standalone: true,
	templateUrl: './section.component.html',
	styleUrl: './section.component.scss'
})
export class FlauxSectionComponent {

	@Input()
	@HostBinding('style.min-height')
		height: string = 'inherit';

	@Input()
	@HostBinding('style.padding-inline')
		inlinePadding: string = '0';

	@Input()
	@HostBinding('style.padding-block')
		blockPadding: string = '0';

	@Input()
	@HostBinding('style.position')
		positioning: string = 'relative';

	@Input()
	@HostBinding('style.flex-direction')
		flexDirection: string = 'row';

}
