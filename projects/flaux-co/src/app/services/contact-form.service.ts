import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'projects/flaux-co/environments/environment';
import { UtmService } from './utm/utm.service';

/**
 * Contact form submission data interface
 */
export interface ContactFormData {
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	company?: string;
	projectType?: string[];
	budget?: string;
	timeline?: string;
	preferredContact?: string;
	description?: string;
	serviceArea?: string;
	biggestPain?: string;
	hasCrm?: boolean;
	crmName?: string;
	hasWebsite?: boolean;
	websiteUrl?: string;
}

/**
 * CRM submission response
 */
export interface ContactSubmissionResponse {
	ok: boolean;
	id?: string;
	error?: string;
}

/**
 * Contact Form Service
 * Handles submission of contact form data to the Vendasta CRM via Cloud Functions
 */
@Injectable({ providedIn: 'root' })
export class ContactFormService {
	// Cloud Functions endpoint (base URL from environment config)
	private readonly submitContactUrl = `${environment.cloudFunctionsUrl}/submitContact`;
	// private readonly submitContactUrl = 'https://webhook.site/097d278b-00bf-42aa-8565-6358ce445675';
	// private readonly submitContactUrl = 'https://automations.businessapp.io/start/8VAK/2285e0a0-a87f-44eb-bdc9-73e6221838c5';

	// Request timeout in milliseconds
	private readonly timeout = 30000; // 30 seconds
	private http = inject(HttpClient);
	private utm = inject(UtmService);

	/**
	 * Submit contact form to CRM
	 * @param formData The contact form data to submit
	 * @returns Observable with submission response
	 */
	submit(formData: ContactFormData): Observable<ContactSubmissionResponse> {
		// Prepare payload - only send fields that are defined
		let payload = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			...(formData.phone && { phone: formData.phone }),
			...(formData.company && { company: formData.company }),
			...(formData.projectType?.length && { projectType: formData.projectType }),
			...(formData.budget && { budget: formData.budget }),
			...(formData.timeline && { timeline: formData.timeline }),
			...(formData.preferredContact && { preferredContact: formData.preferredContact }),
			...(formData.description && { description: formData.description }),
			...(formData.serviceArea && { serviceArea: formData.serviceArea }),
			...(formData.biggestPain && { biggestPain: formData.biggestPain }),
			...(formData.hasCrm !== undefined && { hasCrm: formData.hasCrm }),
			...(formData.crmName && { crmName: formData.crmName }),
			...(formData.hasWebsite !== undefined && { hasWebsite: formData.hasWebsite }),
			...(formData.websiteUrl && { websiteUrl: formData.websiteUrl }),
		};

		payload = this.utm.withUtm(payload);

		return this.http.post<ContactSubmissionResponse>(this.submitContactUrl, payload).pipe(
			timeout(this.timeout),
			catchError(error => this.handleError(error)),
		);
	}

	/**
	 * Validate required fields before submission
	 * @param formData The contact form data to validate
	 * @returns Array of error messages, empty if valid
	 */
	validateForm(formData: ContactFormData): string[] {
		const errors: string[] = [];

		if (!formData.firstName?.trim()) {
			errors.push('First Name is required');
		}

		if (!formData.lastName?.trim()) {
			errors.push('Last Name is required');
		}

		if (!formData.email?.trim()) {
			errors.push('Email is required');
		} else if (!this.isValidEmail(formData.email)) {
			errors.push('Please enter a valid email address');
		}

		if (formData.phone && !this.isValidPhone(formData.phone)) {
			errors.push('Please enter a valid phone number');
		}

		return errors;
	}

	/**
	 * Simple email validation
	 */
	private isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	/**
	 * Simple phone validation (checks for minimum length after cleaning digits)
	 */
	private isValidPhone(phone: string): boolean {
		const digits = phone.replace(/\D/g, '');
		return digits.length >= 10; // At minimum 10 digits (US standard)
	}

	/**
	 * Handle HTTP errors
	 */
	private handleError(error: any) {
		let errorMessage = 'Failed to submit contact form';

		if (error.error instanceof ErrorEvent) {
			// Client-side error
			errorMessage = error.error.message;
		} else if (error.status) {
			// Server-side error
			errorMessage = error.error?.error || `Server error: ${error.status}`;
		} else if (error.name === 'TimeoutError') {
			errorMessage = 'Request timed out. Please try again.';
		}

		console.error('Contact form submission error:', errorMessage);
		return throwError(() => new Error(errorMessage));
	}
}
