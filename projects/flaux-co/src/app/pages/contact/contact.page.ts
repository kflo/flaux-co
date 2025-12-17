import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
	Component, inject, ViewChild, ElementRef, ChangeDetectorRef,
	signal
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FlauxSectionComponent } from '@app/shared/flaux-section/flaux-section.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { FooterComponent } from "@app/shared/footer/footer.component";
import { ContactFormService } from '@app/services/contact-form.service';
import { FlauxBtnComponent } from '@app/shared/flaux-btn/flaux-btn.component';

@Component({
	selector: 'flaux-contact',
	standalone: true,
	imports: [
		FlauxSectionComponent,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatCheckboxModule,
		MatButtonModule,
		MatSliderModule,
		FooterComponent,
		MatSnackBarModule,
		FlauxBtnComponent
	],
	templateUrl: './contact.page.html',
	styleUrls: ['./contact.page.scss']
})
export class ContactPage {
	form: FormGroup | null;
	private contactFormService = inject(ContactFormService);
	private snackBar = inject(MatSnackBar);
	private cdr = inject(ChangeDetectorRef);
	private router = inject(Router);

	@ViewChild('snapshotWidgetContainer') widgetContainer!: ElementRef;

	isSubmitting = signal(false);
	submissionMessage: {
		type: 'success' | 'error' | null;
		text: string;
	} = {
			type: null,
			text: ''
		};

	private readonly initialFormValues = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		prefersEmail: false,
		prefersPhone: false,
		prefersSms: false,
		company: '',
		projectType: [] as string[],
		budgetIndex: 0,
		timelineIndex: 0,
		description: ''
	};

	constructor (private fb: FormBuilder) {
		this.form = this.createForm();
		console.log({ form: this.form?.value });
	}

	openSnackBar(message: string, action: string, ) {
		this.snackBar.open(message, action, {
			horizontalPosition: 'right',
			verticalPosition: 'top',
			duration: 7000,
		});
	}

	private createForm(): FormGroup {
		return this.fb.group({
			firstName: [this.initialFormValues.firstName, { validators: [Validators.required] }],
			lastName: [this.initialFormValues.lastName, { validators: [Validators.required] }],
			email: [this.initialFormValues.email, { validators: [Validators.required, Validators.email] }],
			phone: [this.initialFormValues.phone, { validators: [Validators.required, Validators.pattern(/^[0-9\s\-.+()]{12,20}$/)] }],
			prefersEmail: [this.initialFormValues.prefersEmail],
			prefersPhone: [this.initialFormValues.prefersPhone],
			prefersSms: [this.initialFormValues.prefersSms],
			company: [this.initialFormValues.company],
			projectType: [this.initialFormValues.projectType],
			budgetIndex: [this.initialFormValues.budgetIndex],
			timelineIndex: [this.initialFormValues.timelineIndex],
			description: [this.initialFormValues.description, { validators: [Validators.required] }]
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
		this.form?.patchValue({ phone: formatted }, { emitEvent: false });
	}

	onSubmit() {
		// Reset previous message
		this.submissionMessage = {
			type: null,
			text: ''
		};

		// Validate form
		const errors = this.contactFormService.validateForm(this.form?.value);
		if (errors.length > 0) {
			this.submissionMessage = {
				type: 'error',
				text: errors.join('; ')
			};
			return;
		}

		// Prevent duplicate submissions
		if (this.isSubmitting()) {
			return;
		}

		this.isSubmitting.set(true);
		const value = this.form?.value;

		// Build comma-delimited preferred contact methods
		const preferredMethods: string[] = [];
		if (value.prefersEmail) preferredMethods.push('Email');
		if (value.prefersPhone) preferredMethods.push('Phone');
		if (value.prefersSms) preferredMethods.push('SMS');

		// ! Consolidate description with additional details, due to Vendasta limitations
		const descriptionParts = [
			value.description || '',
			value.projectType?.length ? `🟄 Project Type: ${value.projectType.join(', ')}` : '',
			`🟄 Budget: ${this.budgetSliderLabels[value.budgetIndex]}`,
			`🟄 Timeline: ${this.timelineSliderLabels[value.timelineIndex]}`,
			preferredMethods.length > 0 ? `🟄 Preferred Contact: ${preferredMethods.join(', ')}` : ''
		].filter(Boolean);

		const result = {
			firstName: value.firstName,
			lastName: value.lastName,
			email: value.email,
			phone: value.phone ? value.phone.replace(/\D/g, '') : undefined,
			company: value.company || undefined,
			projectType: value.projectType?.length ? value.projectType : undefined,
			budget: this.budgetSliderLabels[value.budgetIndex],
			timeline: this.timelineSliderLabels[value.timelineIndex],
			preferredContact: preferredMethods.length > 0 ? preferredMethods.join(', ') : undefined,
			description: descriptionParts.join(' ')
		};

		this.contactFormService.submit(result).subscribe({
			next: (response) => {
				console.log('Response received:', response);
				if (response?.ok) {
					this.isSubmitting.set(false);
					// Reset form and clear validation state
					this.form?.reset(this.initialFormValues);
					// Mark all controls as untouched to clear Material error styling
					Object.keys(this.form?.controls || {}).forEach(key => {
						this.form?.get(key)?.setErrors(null);
						this.form?.get(key)?.markAsUntouched();
						this.form?.get(key)?.markAsPristine();
					});
					console.log({ form: this.form?.value });

					// Navigate to thank you page
					this.router.navigate(['/thank-you']);
				} else {
					this.openSnackBar('Error — ' + (response?.error || 'Failed to submit form. Please try again.'), '✖');
				}
			},
			error: (error) => {
				console.error('Submission error:', error);
				this.openSnackBar('Error — An error occurred while submitting the form. Please try again later.', '✖');
			},
		});
	}
}
