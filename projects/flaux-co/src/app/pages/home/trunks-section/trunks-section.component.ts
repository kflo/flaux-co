import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FlauxSectionComponent} from '@app/shared/section/section.component';
import { FlauxBtnComponent } from "@app/shared/flaux-btn/flaux-btn.component";
import {LaserFlowComponent} from '@app/shared/laser-flow';
import { IconMarqueeComponent } from '@app/shared/icon-marquee';

@Component({
	selector: 'trunks-section',
	imports: [FlauxSectionComponent, FlauxBtnComponent, LaserFlowComponent, IconMarqueeComponent],
	templateUrl: './trunks-section.component.html',
	styleUrl: './trunks-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrunksSectionComponent { }
