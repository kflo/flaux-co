import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
	Component, inject, ViewChild, ElementRef, signal, OnInit,
	ChangeDetectionStrategy
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { FlauxSectionComponent } from '@app/shared/flaux-section/flaux-section.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { FooterComponent } from "@app/shared/footer/footer.component";
import { ContactFormService } from '@app/services/contact-form.service';
import {
	INITIAL_FORM_VALUES,
	PROJECT_TYPE_GROUPS,
	BUDGET_SLIDER_LABELS,
	TIMELINE_SLIDER_LABELS
} from './contact.constants';
import { SeoService } from '@app/services/seo.service';

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
	],
	templateUrl: './contact.page.html',
	styleUrls: ['./contact.page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPage implements OnInit {
	private contactFormService = inject(ContactFormService);
	private snackBar = inject(MatSnackBar);
	private router = inject(Router);
	private breakpointObserver = inject(BreakpointObserver);

	@ViewChild('snapshotWidgetContainer') widgetContainer!: ElementRef;

	form: FormGroup | null;

	isSubmitting = signal(false);
	isMobile = signal(false);
	submissionMessage: {
		type: 'success' | 'error' | null;
		text: string;
	} = {
			type: null,
			text: ''
		};

	readonly projectTypeGroups = PROJECT_TYPE_GROUPS;

	private seoService = inject(SeoService);

	constructor (private fb: FormBuilder ) {
		this.form = this.createForm();
	}

	ngOnInit() {
		this.seoService.update({
			title: 'Contact Us | Flaux',
			description: 'Get in touch with the Flaux team to discuss your AI and automation needs. We\'re here to help your business grow with cutting-edge solutions.',
			image: '/assets/img/agency/ai-web-chat-collage.png'
		});

		this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
			.subscribe(result => {
				this.isMobile.set(result.matches);
			});
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
			firstName: [INITIAL_FORM_VALUES.firstName, { validators: [Validators.required] }],
			lastName: [INITIAL_FORM_VALUES.lastName, { validators: [Validators.required] }],
			email: [INITIAL_FORM_VALUES.email, { validators: [Validators.required, Validators.email] }],
			phone: [INITIAL_FORM_VALUES.phone, { validators: [Validators.required, Validators.pattern(/^[0-9\s\-.+()]{12,20}$/)] }],
			prefersEmail: [INITIAL_FORM_VALUES.prefersEmail],
			prefersPhone: [INITIAL_FORM_VALUES.prefersPhone],
			prefersSms: [INITIAL_FORM_VALUES.prefersSms],
			company: [INITIAL_FORM_VALUES.company],
			projectType: [INITIAL_FORM_VALUES.projectType],
			budgetIndex: [INITIAL_FORM_VALUES.budgetIndex],
			timelineIndex: [INITIAL_FORM_VALUES.timelineIndex],
			description: [INITIAL_FORM_VALUES.description, { validators: [] }],
			setAppointment: [INITIAL_FORM_VALUES.setAppointment]
		});
	}

	budgetDisplayFn = (index: number) => BUDGET_SLIDER_LABELS[index] ?? '';
	timelineDisplayFn = (index: number) => TIMELINE_SLIDER_LABELS[index] ?? '';

	hasFlauxAIProjectType(): boolean {
		const selectedTypes = this.form?.get('projectType')?.value || [];
		const flauxAIOptions = this.projectTypeGroups[0].options;
		return selectedTypes.some((type: string) => flauxAIOptions.includes(type));
	}

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

	private preparePayload(value: any) {
		const preferredMethods: string[] = [];
		if (value.prefersEmail) preferredMethods.push('Email');
		if (value.prefersPhone) preferredMethods.push('Phone');
		if (value.prefersSms) preferredMethods.push('SMS');

		const preferredContact = preferredMethods.length > 0 ? preferredMethods.join(', ') : undefined;

		// ! Consolidate description with additional details, due to Vendasta limitations
		const descriptionParts = [
			value.description || '',
			value.projectType?.length ? `🟄 Project Type: ${value.projectType.join(', ')}` : '',
			`🟄 Budget: ${BUDGET_SLIDER_LABELS[value.budgetIndex]}`,
			`🟄 Timeline: ${TIMELINE_SLIDER_LABELS[value.timelineIndex]}`,
			preferredContact ? `🟄 Preferred Contact: ${preferredContact}` : ''
		].filter(Boolean);

		return {
			firstName: value.firstName,
			lastName: value.lastName,
			email: value.email,
			phone: value.phone ? value.phone.replace(/\D/g, '') : undefined,
			company: value.company || undefined,
			projectType: value.projectType?.length ? value.projectType : undefined,
			budget: BUDGET_SLIDER_LABELS[value.budgetIndex],
			timeline: TIMELINE_SLIDER_LABELS[value.timelineIndex],
			preferredContact,
			description: descriptionParts.join(' ')
		};
	}

	private resetForm() {
		this.form?.reset(INITIAL_FORM_VALUES);
		Object.keys(this.form?.controls || {}).forEach(key => {
			const control = this.form?.get(key);
			control?.setErrors(null);
			control?.markAsUntouched();
			control?.markAsPristine();
		});
	}

	onSubmit() {
		this.submissionMessage = {
			type: null, text: ''
		};

		const formValue = this.form?.value;

		const errors = this.contactFormService.validateForm(formValue);
		if (errors.length > 0) {
			this.submissionMessage = {
				type: 'error', text: errors.join('; ')
			};
			return;
		}

		if (this.isSubmitting()) return;
		this.isSubmitting.set(true);

		const payload = this.preparePayload(formValue);

		this.contactFormService.submit(payload).subscribe({
			next: (response) => {
				this.isSubmitting.set(false);
				if (response?.ok) {
					const queryParams: any = { cal: formValue.setAppointment ? 1 : 0 };
					if (formValue.setAppointment) {
						queryParams.name = `${formValue.firstName} ${formValue.lastName}`;
						queryParams.email = formValue.email;
						queryParams.utm_source = response.payload?.utm_source;
						queryParams.utm_medium = response.payload?.utm_medium;
						queryParams.utm_campaign = response.payload?.utm_campaign;
						queryParams.utm_content = response.payload?.utm_content;
					}
					this.resetForm();
					this.router.navigate(['/submitted'], { queryParams });
				} else {
					this.openSnackBar('Error — ' + (response?.error || 'Failed to submit form. Please try again.'), '✖');
				}
			},
			error: (error) => {
				this.isSubmitting.set(false);
				console.error('Submission error:', error);
				this.openSnackBar('Error — An error occurred while submitting the form. Please try again later.', '✖');
			},
		});
	}
}
