import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlauxSectionComponent } from "@app/shared/section/section.component";

@Component({
	selector: 'ai-solutions-process-section',
	imports: [FlauxSectionComponent],
	templateUrl: './ai-solutions-process-section.component.html',
	styleUrl: './ai-solutions-process-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSolutionsProcessSection {
	processSteps = [
		{
			step: '01',
			title: 'Discovery & Analysis',
			description: 'We analyze your business needs, data sources, and identify AI opportunities that deliver maximum impact.',
			duration: '1-2 weeks'
		},
		{
			step: '02',
			title: 'Strategy & Planning',
			description: 'Create a comprehensive AI roadmap with clear milestones, timelines, and success metrics.',
			duration: '1 week'
		},
		{
			step: '03',
			title: 'Development & Training',
			description: 'Build and train custom AI models using your data with cutting-edge machine learning techniques.',
			duration: '4-8 weeks'
		},
		{
			step: '04',
			title: 'Integration & Testing',
			description: 'Seamlessly integrate AI solutions into your existing systems with thorough testing protocols.',
			duration: '2-3 weeks'
		},
		{
			step: '05',
			title: 'Deployment & Support',
			description: 'Launch your AI solution with ongoing monitoring, optimization, and continuous support.',
			duration: 'Ongoing'
		}
	];
}
