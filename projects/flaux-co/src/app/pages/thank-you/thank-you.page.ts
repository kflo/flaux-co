import { Component, inject, effect } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { FlauxSectionComponent } from '@app/shared/flaux-section/flaux-section.component';
import { FooterComponent } from '@app/shared/footer/footer.component';
import { FlauxBtnComponent } from '@app/shared/flaux-btn/flaux-btn.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { NgTemplateOutlet } from '@angular/common';
import { style } from 'node_modules/@angular/animations/types/_animation_player-chunk';

@Component({
	selector: 'flaux-thank-you',
	standalone: true,
	imports: [
		FlauxSectionComponent,
		FooterComponent,
		FlauxBtnComponent,
		RouterLink,
		MatExpansionModule,
		NgTemplateOutlet
	],
	templateUrl: './thank-you.page.html',
	styleUrls: ['./thank-you.page.scss']
})
export class ThankYouPage {
	private route = inject(ActivatedRoute);

	showCalendar = toSignal(
		this.route.queryParamMap.pipe(
			map(params => params.get('cal') === '1')
		),
		{ initialValue: false }
	);

	userName = toSignal(
		this.route.queryParamMap.pipe(
			map(params => params.get('name') || '')
		),
		{ initialValue: '' }
	);

	userEmail = toSignal(
		this.route.queryParamMap.pipe(
			map(params => params.get('email') || '')
		),
		{ initialValue: '' }
	);

	constructor() {
		effect(() => {
			if (this.showCalendar()) {
				// Wait for the next tick to ensure the element is rendered in the DOM
				setTimeout(() => {
					const cal = (window as any).Cal;
					if (cal && cal.ns && cal.ns["ai-strategy-call"]) {
						const calConfig: any = {
							elementOrSelector: "#my-cal-inline-ai-strategy-call",
							config: {
								layout: "month_view",
								hideEventTypeDetails: true,
								theme: "light"
							},
							calLink: "flaux/ai-strategy-call"
						};

						if (this.userName()) {
							calConfig.config.name = this.userName();
						}
						if (this.userEmail()) {
							calConfig.config.email = this.userEmail();
						}

						(window as any).Cal("inline", calConfig);
					}
				}, 0);
			}
		});
	}
}
