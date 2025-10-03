import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FlauxSectionComponent} from '@app/shared/section/section.component';
import { FlauxBtnComponent } from "@app/shared/flaux-btn/flaux-btn.component";

@Component({
	selector: 'trunks-section',
	imports: [FlauxSectionComponent, FlauxBtnComponent],
	templateUrl: './trunks-section.component.html',
	styleUrl: './trunks-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrunksSectionComponent { }
