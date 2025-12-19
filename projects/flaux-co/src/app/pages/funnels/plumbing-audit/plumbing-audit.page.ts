import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	ViewChild,
	inject
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlauxSectionComponent } from '@app/shared/flaux-section/flaux-section.component';
import { FooterComponent } from '@app/shared/footer/footer.component';
import { FlauxBtnComponent } from "@app/shared/flaux-btn/flaux-btn.component";
import { PlumbingAuditFormComponent } from './components/plumbing-audit-form/plumbing-audit-form.component';
import { MobileComponent } from '@app/shared/mobile/mobile.component';
import { UxService } from '@app/services/ux.service';
import { SeoService } from '@app/services/seo.service';

@Component({
	selector: 'flaux-plumbing-audit',
	standalone: true,
	imports: [MatButtonModule, MatExpansionModule, FlauxSectionComponent, FooterComponent, FlauxBtnComponent, PlumbingAuditFormComponent, MobileComponent],
	templateUrl: './plumbing-audit.page.html',
	styleUrls: ['./plumbing-audit.page.scss']
})
export class PlumbingAuditPage implements AfterViewInit, OnDestroy {
	@ViewChild('plumbingVideo', { static: true })
	private plumbingVideoRef?: ElementRef<HTMLIFrameElement>;

	private observer?: IntersectionObserver;
	private hasAutoplayed = false;
	private unmuteTimeout?: number;

	uxService = inject(UxService);
	private seoService = inject(SeoService);

	ngOnInit() {
		this.seoService.update({
			title: 'Free Plumbing Audit | Flaux',
			description: 'Get a comprehensive Plumbing audit for your business. Identify inefficiencies and optimize performance with our expert analysis.',
			image: '/assets/img/funnel/devices-snapshot.png',
		});
	}

	ngAfterViewInit(): void {
		const iframe = this.plumbingVideoRef?.nativeElement;
		const autoplaySrc = iframe?.dataset?.['autoplaySrc'];
		if (!iframe || !autoplaySrc) {
			return;
		}

		this.observer = new IntersectionObserver((entries) => {
			if (this.hasAutoplayed) {
				return;
			}

			const visible = entries.some((entry) => entry.isIntersecting);
			if (visible) {
				iframe.src = autoplaySrc;
				iframe.addEventListener('load', () => this.queueUnmute(iframe), { once: true });
				this.queueUnmute(iframe);
				this.hasAutoplayed = true;
				this.observer?.disconnect();
			}
		}, { threshold: 0.5 });

		this.observer.observe(iframe);
	}

	ngOnDestroy(): void {
		this.observer?.disconnect();
		this.clearUnmuteTimer();
	}

	private queueUnmute(iframe: HTMLIFrameElement): void {
		this.clearUnmuteTimer();
		this.unmuteTimeout = window.setTimeout(() => this.requestUnmute(iframe), 1200);
	}

	private requestUnmute(iframe: HTMLIFrameElement): void {
		const targetWindow = iframe.contentWindow;
		if (!targetWindow) {
			return;
		}

		// YouTube IFrame API command messages
		targetWindow.postMessage(JSON.stringify({
			event: 'command',
			func: 'unMute',
			args: []
		}), '*');
		targetWindow.postMessage(JSON.stringify({
			event: 'command',
			func: 'setVolume',
			args: [100]
		}), '*');
	}

	private clearUnmuteTimer(): void {
		if (this.unmuteTimeout) {
			window.clearTimeout(this.unmuteTimeout);
			this.unmuteTimeout = undefined;
		}
	}
}
