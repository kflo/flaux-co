import { Component, inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { RouterModule } from '@angular/router';
import { TermsOfServiceComponent } from '../legal-policies/terms-of-service.component';
import { PrivacyPolicyComponent } from '../legal-policies/privacy-policy.component';
import { CookiePolicyComponent } from '../legal-policies/cookie-policy.component';

@Component({
	selector: 'flaux-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
	standalone: true,
	imports: [RouterModule, MatBottomSheetModule]
})
export class FooterComponent {
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
}
