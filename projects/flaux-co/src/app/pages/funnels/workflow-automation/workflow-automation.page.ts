import { Component, inject, ViewChild, ElementRef } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlauxSectionComponent } from '@app/shared/flaux-section/flaux-section.component';
import { FooterComponent } from '@app/shared/footer/footer.component';
import { FlauxBtnComponent } from "@app/shared/flaux-btn/flaux-btn.component";
// import { MobileComponent } from '@app/shared/mobile/mobile.component';
// import { FlauxQuoteHighlightComponent } from '@app/shared/quote-highlight/quote-highlight.component';
import { UxService } from '@app/services/ux.service';
import { SeoService } from '@app/services/seo.service';
import { FlauxRotatingTextComponent } from '@app/shared/flaux-rotating-text/flaux-rotating-text.component';
import { questions } from '@app/shared/consts/ai-workflow-questions';
import { environment } from 'projects/flaux-co/environments/environment';
import { WorkflowAuditFormComponent } from './audit-form/workflow-audit-form.component';

@Component({
	selector: 'flaux-workflow-automation',
	standalone: true,
	imports: [MatButtonModule, MatExpansionModule, FlauxSectionComponent, FooterComponent, FlauxBtnComponent, FlauxRotatingTextComponent, WorkflowAuditFormComponent],
	templateUrl: './workflow-automation.page.html',
	styleUrls: ['./workflow-automation.page.scss']
})
export class WorkflowAutomationPage {
	uxService = inject(UxService);
	private seoService = inject(SeoService);
	questions = questions;

	@ViewChild('auditProcess') auditProcess!: ElementRef<HTMLDivElement>;

	clockUrl = `${environment.r2BucketUrl}vid/flaux-clockwork.mp4`;

	onTimeUpdate(video: HTMLVideoElement) {
		const startTime = 3.28; // Replace with your start timestamp (in seconds)
		const endTime = 7;  // Replace with your end timestamp (in seconds)

		if (video.currentTime >= endTime || video.currentTime < startTime) {
			video.currentTime = startTime;
		}
	}

	scrollAudit(direction: 'left' | 'right') {
		const container = this.auditProcess.nativeElement;
		const scrollAmount = container.clientWidth * 0.8;
		const targetScroll = direction === 'left'
			? container.scrollLeft - scrollAmount
			: container.scrollLeft + scrollAmount;

		container.scrollTo({
			left: targetScroll, behavior: 'smooth'
		});
	}

	ngOnInit() {
		this.seoService.update({
			title: 'Workflow Automation Audit | Flaux',
			description: 'Stop trading time for tasks. Get a free Workflow Automation Audit and see how AI-powered orchestration can scale your operations.',
			image: '/assets/img/funnel/automation-snapshot.png',
		});
	}
}
