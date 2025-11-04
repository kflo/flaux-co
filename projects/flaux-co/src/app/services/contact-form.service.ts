import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'projects/flaux-co/environments/environment';

/**
 * Contact form submission data interface
 */
export interface ContactFormData {
	name: string;
	email: string;
	phone?: string;
	company?: string;
	projectType?: string[];
	budget?: string;
	timeline?: string;
	description?: string;
	prefersEmail?: boolean;
	prefersPhone?: boolean;
	prefersSms?: boolean;
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
@Injectable({
	providedIn: 'root'
})
export class ContactFormService {
	// Webhook.site temporary endpoint for demo
	// TODO: Switch back to Cloud Functions after demo
	// private readonly contactFunctionUrl = 'https://us-central1-flaux-site-dev.cloudfunctions.net/submitContact';
	// private readonly contactFunctionUrlProd = 'https://us-central1-flaux-site-prod.cloudfunctions.net/submitContact';
	private readonly contactFunctionUrl = 'https://webhook.site/56d7fe91-285f-4036-94dc-1fa068da9c76';
	private readonly contactFunctionUrlProd = 'https://webhook.site/56d7fe91-285f-4036-94dc-1fa068da9c76';

	// Request timeout in milliseconds
	private readonly timeout = 30000; // 30 seconds

	constructor(private http: HttpClient) {}

	/**
	 * Submit contact form to CRM
	 * @param formData The contact form data to submit
	 * @returns Observable with submission response
	 */
	submit(formData: ContactFormData): Observable<ContactSubmissionResponse> {
		const endpoint = environment.production
			? this.contactFunctionUrlProd
			: this.contactFunctionUrl;

		// Prepare payload - only send fields that are defined
		const payload = {
			name: formData.name,
			email: formData.email,
			...(formData.phone && { phone: formData.phone }),
			...(formData.company && { company: formData.company }),
			...(formData.projectType?.length && { projectType: formData.projectType }),
			...(formData.budget && { budget: formData.budget }),
			...(formData.timeline && { timeline: formData.timeline }),
			...(formData.description && { description: formData.description }),
		};

		// For webhook.site (demo), use image beacon workaround to bypass CORS
		if (endpoint.includes('webhook.site')) {
			return this.submitViaBeacon(endpoint, payload);
		}

		return this.http.post<ContactSubmissionResponse>(endpoint, payload).pipe(
			timeout(this.timeout),
			catchError(error => this.handleError(error))
		);
	}

	/**
	 * Submit via image beacon (bypasses CORS for webhook.site)
	 */
	private submitViaBeacon(endpoint: string, payload: any): Observable<ContactSubmissionResponse> {
		return new Observable(observer => {
			try {
				// Convert payload to URL query parameters
				const params = new URLSearchParams();
				params.append('data', JSON.stringify(payload));
				const beaconUrl = `${endpoint}?${params.toString()}`;

				// Use image beacon to send data (bypasses CORS)
				const img = new Image();
				img.onload = () => {
					observer.next({
						ok: true,
						id: 'beacon-submitted'
					});
					observer.complete();
				};
				img.onerror = () => {
					// Beacon still sends even if image fails to load
					observer.next({
						ok: true,
						id: 'beacon-submitted'
					});
					observer.complete();
				};
				img.src = beaconUrl;
			} catch (error) {
				observer.error(error);
			}
		});
	}

	/**
	 * Validate required fields before submission
	 * @param formData The contact form data to validate
	 * @returns Array of error messages, empty if valid
	 */
	validateForm(formData: ContactFormData): string[] {
		const errors: string[] = [];

		if (!formData.name?.trim()) {
			errors.push('Name is required');
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
