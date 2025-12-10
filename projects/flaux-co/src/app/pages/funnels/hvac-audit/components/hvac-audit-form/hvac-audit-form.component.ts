import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactFormService } from '@app/services/contact-form.service';

@Component({
	selector: 'flaux-hvac-audit-form',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSnackBarModule
	],
	templateUrl: './hvac-audit-form.component.html',
	styleUrls: ['./hvac-audit-form.component.scss']
})
export class HvacAuditFormComponent {
	private fb = inject(FormBuilder);
	private contactFormService = inject(ContactFormService);
	private snackBar = inject(MatSnackBar);

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
			biggestPain: ['']
		});
	}

	onSubmit() {
		if (this.form.invalid || this.isSubmitting()) {
			return;
		}

		this.isSubmitting.set(true);
		const formValue = this.form.value;

		this.contactFormService.submit({
			firstName: formValue.firstName,
			lastName: formValue.lastName,
			email: formValue.email,
			phone: formValue.phone,
			company: formValue.companyName,
			serviceArea: formValue.serviceArea,
			biggestPain: formValue.biggestPain,
			description: `Service Area: ${formValue.serviceArea}\nBiggest Pain: ${formValue.biggestPain}` // Fallback/Additional info
		}).subscribe({
			next: () => {
				this.isSubmitting.set(false);
				this.form.reset();
				this.openSnackBar('Audit request submitted successfully! We will be in touch shortly.', 'Close');
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
