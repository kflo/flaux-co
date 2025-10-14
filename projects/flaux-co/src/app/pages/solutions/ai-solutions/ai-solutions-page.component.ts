import { ChangeDetectionStrategy, Component } from '@angular/core';
import {PrivacyConfirmedSectionComponent} from '../agency-solutions/privacy-confirmed-section/privacy-confirmed-section.component';
import { AiSolutionsHeroSectionComponent } from "./ai-solutions-hero-section/ai-solutions-hero-section.component";

@Component({
	selector: 'ai-solutions-page',
	standalone: true,
	imports: [PrivacyConfirmedSectionComponent, AiSolutionsHeroSectionComponent],
	templateUrl: './ai-solutions-page.component.html',
	styleUrl: './ai-solutions-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSolutionsPageComponent {

}
