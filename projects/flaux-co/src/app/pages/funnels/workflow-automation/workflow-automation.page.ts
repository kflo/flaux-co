import {
	Component,
	inject
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlauxSectionComponent } from '@app/shared/flaux-section/flaux-section.component';
import { FooterComponent } from '@app/shared/footer/footer.component';
import { FlauxBtnComponent } from "@app/shared/flaux-btn/flaux-btn.component";
// import { MobileComponent } from '@app/shared/mobile/mobile.component';
import { UxService } from '@app/services/ux.service';
import { SeoService } from '@app/services/seo.service';

import { FlauxQuoteHighlightComponent } from '@app/shared/quote-highlight/quote-highlight.component';
import { FlauxRotatingTextComponent } from '@app/shared/flaux-rotating-text/flaux-rotating-text.component';
import { questions } from '@app/shared/consts/ai-workflow-questions';

@Component({
	selector: 'flaux-workflow-automation',
	standalone: true,
	imports: [MatButtonModule, MatExpansionModule, FlauxSectionComponent, FooterComponent, FlauxBtnComponent, FlauxQuoteHighlightComponent, FlauxRotatingTextComponent],
	templateUrl: './workflow-automation.page.html',
	styleUrls: ['./workflow-automation.page.scss']
})
export class WorkflowAutomationPage {
	uxService = inject(UxService);
	private seoService = inject(SeoService);
	questions = questions

	ngOnInit() {
		this.seoService.update({
			title: 'Workflow Automation Audit | Flaux',
			description: 'Stop trading time for tasks. Get a free Workflow Automation Audit and see how AI-powered orchestration can scale your operations.',
			image: '/assets/img/funnel/automation-snapshot.png',
		});
	}
}
