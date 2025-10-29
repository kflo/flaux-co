
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FlauxSectionComponent } from '@app/shared/section/section.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';

@Component({
	selector: 'flaux-contact',
	standalone: true,
	imports: [
		FlauxSectionComponent,
		ReactiveFormsModule,
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatSliderModule,
	],
	templateUrl: './contact.page.html',
	styleUrls: ['./contact.page.scss']
})
export class ContactPage {
	form: FormGroup;

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			name: ['', {validators: [Validators.required]}],
			email: ['', {validators: [Validators.required, Validators.email]}],
			company: [''],
			projectType: [''],
			budgetIndex: [0],
			timelineIndex: [0],
			description: ['']
		});
	}

	projectTypes = [
		'AI Education & Training',
		'AI Chat Agent',
		'AI Strategy & Consulting',
		'AI Voice Agent',
		'Automation & Integrations',
		'Marketing & Lead Generation',
		'Custom AI Integration',
		'Computer Vision',
		'Other'
	];

	budgetSliderLabels = [
		'TBD',
		'< $1k',
		'$1k - $5k',
		'$5k - $10k',
		'$10k - $25k',
		'$25k - $50k',
		'$50k - $100k',
		'$100k - $250k',
		'$250k+',
	];

	timelineSliderLabels = [
		'ASAP',
		'1-4 weeks',
		'1-3 months',
		'3-6 months',
		'6-12 months',
		'12+ months',
		'Flexible'
	];

	budgetDisplayFn = (index: number) => this.budgetSliderLabels[index] ?? '';
	timelineDisplayFn = (index: number) => this.timelineSliderLabels[index] ?? '';

	onSubmit() {
		const value = this.form.value;
		const result = {
			...value,
			budget: this.budgetSliderLabels[value.budgetIndex],
			timeline: this.timelineSliderLabels[value.timelineIndex]
		};
		console.log('Contact form submitted:', result);
		// Handle form submission logic here
	}
}
