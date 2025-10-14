import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlauxSectionComponent } from "@app/shared/section/section.component";

@Component({
	selector: 'privacy-confirmed-section',
	imports: [FlauxSectionComponent],
	standalone: true,
	templateUrl: './privacy-confirmed-section.component.html',
	styleUrl: './privacy-confirmed-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyConfirmedSectionComponent { }
