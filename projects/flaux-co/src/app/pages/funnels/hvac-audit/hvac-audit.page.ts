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
import { HvacAuditFormComponent } from './components/hvac-audit-form/hvac-audit-form.component';
import { MobileComponent } from '@app/shared/mobile/mobile.component';
import { UxService } from '@app/services/ux.service';
import { SeoService } from '@app/services/seo.service';

@Component({
	selector: 'flaux-hvac-audit',
	standalone: true,
	imports: [MatButtonModule, MatExpansionModule, FlauxSectionComponent, FooterComponent, FlauxBtnComponent, HvacAuditFormComponent, MobileComponent],
	templateUrl: './hvac-audit.page.html',
	styleUrls: ['./hvac-audit.page.scss']
})
export class HvacAuditPage implements AfterViewInit, OnDestroy {
	@ViewChild('hvacVideo', { static: true })
	private hvacVideoRef?: ElementRef<HTMLIFrameElement>;

	private observer?: IntersectionObserver;
	private hasAutoplayed = false;
	private unmuteTimeout?: number;

	uxService = inject(UxService);
	private seoService = inject(SeoService);

	ngOnInit() {
		this.seoService.update({
			title: 'AI Solutions for SMBs | Flaux',
			description: 'Chat and voice agents, custom AI workflows, and practical marketing to grow your business.',
			image: '/assets/img/agency/ai-web-chat-collage.png'
		});
	}

	ngAfterViewInit(): void {
		const iframe = this.hvacVideoRef?.nativeElement;
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
			clearTimeout(this.unmuteTimeout);
			this.unmuteTimeout = undefined;
		}
	}
}
