import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactFormService } from '@app/services/contact-form.service';
import { UxService } from '@app/services/ux.service';

@Component({
	selector: 'flaux-plumbing-audit-form',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSnackBarModule,
		MatCheckboxModule
	],
	templateUrl: './plumbing-audit-form.component.html',
	styleUrls: ['./plumbing-audit-form.component.scss']
})
export class PlumbingAuditFormComponent {
	private fb = inject(FormBuilder);
	private contactFormService = inject(ContactFormService);
	private snackBar = inject(MatSnackBar);
	private router = inject(Router);
	uxService = inject(UxService);

	form: FormGroup;
	isSubmitting = signal(false);

	constructor() {
		this.form = this.fb.group({
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			companyName: [''],
			phone: ['', [Validators.required, Validators.pattern(/^[0-9\s\-.+()]{10,20}$/)]],
			email: ['', [Validators.required, Validators.email]],
			serviceArea: [''],
			biggestPain: [''],
			hasCrm: [false],
			crmName: [''],
			hasWebsite: [false],
			websiteUrl: ['']
		});
	}

	onSubmit() {
		if (this.form.invalid || this.isSubmitting()) {
			return;
		}

		this.isSubmitting.set(true);
		const formValue = this.form.value;

		// ! Consolidate description with additional details, due to Vendasta limitations
		const descriptionParts = [
			formValue.serviceArea ? `🟄 Service Area: ${formValue.serviceArea}` : '',
			formValue.biggestPain ? `🟄 Biggest Pain: ${formValue.biggestPain}` : '',
			formValue.hasWebsite && formValue.websiteUrl ? `🟄 Website: ${formValue.websiteUrl}` : '',
			formValue.hasCrm && formValue.crmName ? `🟄 CRM: ${formValue.crmName}` : ''
		].filter(Boolean);

		this.contactFormService.submit({
			firstName: formValue.firstName,
			lastName: formValue.lastName,
			email: formValue.email,
			phone: formValue.phone,
			company: formValue.companyName,
			serviceArea: formValue.serviceArea,
			biggestPain: formValue.biggestPain,
			hasCrm: formValue.hasCrm,
			crmName: formValue.crmName,
			hasWebsite: formValue.hasWebsite,
			websiteUrl: formValue.websiteUrl,
			description: descriptionParts.join(' ')
		}).subscribe({
			next: () => {
				this.isSubmitting.set(false);
				this.form.reset();
				this.router.navigate(['/thank-you']);
			},
			error: (err) => {
				this.isSubmitting.set(false);
				console.error('Submission error', err);
				this.openSnackBar('Failed to submit request. Please try again.', 'Close');
			}
		});
	}

	private openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			horizontalPosition: 'right',
			verticalPosition: 'top',
			duration: 7000,
		});
	}
}
