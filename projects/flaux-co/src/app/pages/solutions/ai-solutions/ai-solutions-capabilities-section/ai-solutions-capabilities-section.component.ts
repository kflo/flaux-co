import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlauxSectionComponent } from "@app/shared/section/section.component";
import {MatExpansionModule} from '@angular/material/expansion';
import {UxService} from '@app/services/ux.service';


@Component({
	selector: 'ai-solutions-capabilities-section',
	imports: [FlauxSectionComponent, MatExpansionModule, CommonModule],
	templateUrl: './ai-solutions-capabilities-section.component.html',
	styleUrl: './ai-solutions-capabilities-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSolutionsCapabilitiesSection {
	uxService = inject(UxService);
	isMobile = this.uxService.isMobile;

	capabilities = {
		voiceAgents: {
			title: 'Voice Agents',
			description: '',
			icon: 'brain',
			image: '../../../../../assets/img/automation/voice-agents@2x.png'
		},
		chatAgents: {
			title: 'Chat Agents',
			description: '',
			icon: 'message',
			image: '../../../../../assets/img/automation/chat-ai-autoreplies.png'
		},
		smbAiConsulting: {
			title: 'SMB AI Consulting',
			description: '',
			icon: 'eye',
			image: '../../../../../assets/img/automation/consulting-1@2x.png'
		},
		smbAiEducation: {
			title: 'SMB AI Education',
			description: '',
			icon: 'chart',
			image: '../../../../../assets/img/automation/education-2@0.5x.png'
		},
		customAiSolutions: {
			title: 'Custom AI Solutions',
			description: '',
			icon: 'api',
			image: '../../../../../assets/img/automation/ai-brain-7@3x.png'
		},
		aiPoweredMarketing: {
			title: 'Marketing & Lead Generation',
			description: '',
			icon: 'gear',
			image: '../../../../../assets/img/agency/soc-media-splash-2.png'
		}
	};
}
