import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	ViewChild
} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlauxSectionComponent } from '@app/shared/flaux-section/flaux-section.component';
import { FooterComponent } from '@app/shared/footer/footer.component';

@Component({
	selector: 'flaux-hvac-audit',
	standalone: true,
	imports: [MatButtonModule, MatExpansionModule, FlauxSectionComponent, FooterComponent],
	templateUrl: './hvac-audit.page.html',
	styleUrls: ['./hvac-audit.page.scss']
})
export class HvacAuditPage implements AfterViewInit, OnDestroy {
	@ViewChild('hvacVideo', { static: true })
	private hvacVideoRef?: ElementRef<HTMLIFrameElement>;

	private observer?: IntersectionObserver;
	private hasAutoplayed = false;
	private unmuteTimeout?: number;

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
