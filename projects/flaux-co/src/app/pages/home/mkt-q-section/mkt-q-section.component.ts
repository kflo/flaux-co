import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlauxSectionComponent } from "@app/shared/section/section.component";
import {TextCyclerComponent} from '@app/shared/text-cycler/text-cycler.component';

@Component({
	selector: 'mkt-q-section',
	imports: [FlauxSectionComponent, TextCyclerComponent],
	templateUrl: './mkt-q-section.component.html',
	styleUrl: './mkt-q-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MktQSectionComponent { }
