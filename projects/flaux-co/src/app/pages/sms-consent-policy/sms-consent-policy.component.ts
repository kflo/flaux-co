import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-sms-consent-policy',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './sms-consent-policy.component.html',
	styleUrls: ['./sms-consent-policy.component.scss'],
})
export class SmsConsentPolicyComponent {
	getCurrentDate(): string {
		return new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}
}
