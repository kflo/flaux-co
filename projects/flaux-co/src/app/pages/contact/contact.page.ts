import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FlauxSectionComponent } from '@app/shared/section/section.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { FooterComponent } from "@app/shared/footer/footer.component";

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
		MatCheckboxModule,
		MatButtonModule,
		MatSliderModule,
		FooterComponent
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
			phone: ['', {validators: [Validators.required, Validators.pattern(/^[0-9\s\-.+()]{12,20}$/)]}],
			prefersEmail: [false],
			prefersPhone: [false],
			prefersSms: [false],
			company: ['', ],
			projectType: [[]],
			budgetIndex: [0],
			timelineIndex: [0],
			description: ['']
		});
	}

	projectTypeGroups = [
		{
			label: 'FLAUX AI',
			options: [
				'AI Chat Agent',
				'AI Education & Training',
				'AI Strategy & Consulting',
				'AI Voice Agent',
				'Automation & Integrations',
				'Marketing & Lead Generation',
				'Other'
			]
		},
		{
			label: 'FLAUX AGENCY',
			options: [
				'Branding & Identity',
				'Content Creation',
				'Digital Marketing, Ads, SEO',
				'Social Media Management',
				'CRM',
				'AI Workforce (Receptionist, etc)',
				'Website Design & Development',
				'Other'
			]
		}
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

	formatPhoneNumber(value: string): string {
		if (!value) return '';
		const cleaned = value.replace(/\D/g, '');

		if (cleaned.length === 0) return '';
		if (cleaned.length <= 3) return cleaned;
		if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
		if (cleaned.length <= 10) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;

		// International format
		const areaCode = cleaned.slice(-10, -7);
		const exchange = cleaned.slice(-7, -4);
		const subscriber = cleaned.slice(-4);
		const countryCode = cleaned.slice(0, -10);
		return `+${countryCode} (${areaCode}) ${exchange}-${subscriber}`;
	}

	onPhoneInput(event: any) {
		const input = event.target.value;
		const formatted = this.formatPhoneNumber(input);
		this.form.patchValue({phone: formatted}, {emitEvent: false});
	}

	onSubmit() {
		const value = this.form.value;
		const result = {
			...value,
			phone: value.phone ? value.phone.replace(/\D/g, '') : '', // Strip to digits only
			budget: this.budgetSliderLabels[value.budgetIndex],
			timeline: this.timelineSliderLabels[value.timelineIndex]
		};
		console.log('Contact form submitted:', result);
		// Handle form submission logic here
	}
}
