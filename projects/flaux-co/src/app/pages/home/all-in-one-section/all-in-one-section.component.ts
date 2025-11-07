import {Component} from '@angular/core';
import {FlauxBgVideoComponent} from '@app/shared/flaux-bg-video/flaux-bg-video.component';
import {FlauxSectionComponent} from '@app/shared/flaux-section/flaux-section.component';

@Component({
	selector: 'all-in-one-section',
	standalone: true,
	templateUrl: './all-in-one-section.component.html',
	styleUrls: ['./all-in-one-section.component.scss'],
	imports: [FlauxSectionComponent, FlauxBgVideoComponent],
})
export class AllInOneSectionComponent {

}
