import { Component, inject, Input } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { RouterModule } from '@angular/router';
import { TermsOfServiceComponent } from '../legal-policies/terms-of-service.component';
import { PrivacyPolicyComponent } from '../legal-policies/privacy-policy.component';
import { CookiePolicyComponent } from '../legal-policies/cookie-policy.component';

@Component({
	selector: 'flaux-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
	host: { '[class.dark-background]': 'darkBackground' },
	standalone: true,
	imports: [RouterModule, MatBottomSheetModule]
})
export class FooterComponent {
	@Input() darkBackground: boolean = false;
	private bottomSheet = inject(MatBottomSheet);

	openPrivacyPolicy(): void {
		this.bottomSheet.open(PrivacyPolicyComponent, {
			panelClass: 'legal-bottom-sheet',
			backdropClass: 'legal-bottom-sheet-backdrop'
		});
	}

	openTermsOfService(): void {
		this.bottomSheet.open(TermsOfServiceComponent, {
			panelClass: 'legal-bottom-sheet',
			backdropClass: 'legal-bottom-sheet-backdrop'
		});
	}

	openCookiePolicy(): void {
		this.bottomSheet.open(CookiePolicyComponent, {
			panelClass: 'legal-bottom-sheet',
			backdropClass: 'legal-bottom-sheet-backdrop'
		});
	}

	currentYear: number = new Date().getFullYear();
}
