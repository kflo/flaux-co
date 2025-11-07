import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FlauxSectionComponent} from "@app/shared/flaux-section/flaux-section.component";
import {FormsModule} from '@angular/forms';

@Component({
	selector: 'ai-solutions-contact-section',
	imports: [FlauxSectionComponent, FormsModule],
	templateUrl: './ai-solutions-contact-section.component.html',
	styleUrl: './ai-solutions-contact-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSolutionsContactSection {
	contactForm = {
		name: '',
		email: '',
		company: '',
		projectType: '',
		budget: '',
		timeline: '',
		description: ''
	};

	projectTypes = [
		'Machine Learning Model',
		'Natural Language Processing',
		'Computer Vision',
		'Predictive Analytics',
		'Process Automation',
		'Custom AI Integration',
		'AI Strategy Consulting',
		'Other'
	];

	budgetRanges = [
		'Under $50K',
		'$50K - $100K',
		'$100K - $250K',
		'$250K - $500K',
		'$500K+',
		'To be discussed'
	];

	timelineOptions = [
		'ASAP',
		'1-3 months',
		'3-6 months',
		'6-12 months',
		'12+ months',
		'Flexible'
	];

	onSubmit() {
		console.log('Contact form submitted:', this.contactForm);
		// Handle form submission logic here
	}
}
