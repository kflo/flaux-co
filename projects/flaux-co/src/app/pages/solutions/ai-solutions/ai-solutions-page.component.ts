import { ChangeDetectionStrategy, Component } from '@angular/core';
import {PrivacyConfirmedSectionComponent} from '../agency-solutions/privacy-confirmed-section/privacy-confirmed-section.component';
import { AiSolutionsHeroSectionComponent } from "./ai-solutions-hero-section/ai-solutions-hero-section.component";
import {AiSolutionsCapabilitiesSection} from './ai-solutions-capabilities-section/ai-solutions-capabilities-section.component';
import {AiSolutionsProcessSection} from './ai-solutions-process-section/ai-solutions-process-section.component';
import { CtaSectionComponent } from "@app/pages/home/cta-section/cta-section.component";
import { FooterComponent } from "@components/footer/footer.component";

@Component({
	selector: 'ai-solutions-page',
	standalone: true,
	imports: [PrivacyConfirmedSectionComponent, AiSolutionsHeroSectionComponent, AiSolutionsCapabilitiesSection, AiSolutionsProcessSection, CtaSectionComponent, FooterComponent],
	templateUrl: './ai-solutions-page.component.html',
	styleUrl: './ai-solutions-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSolutionsPageComponent {

}
