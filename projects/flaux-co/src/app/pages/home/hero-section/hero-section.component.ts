import { Component } from '@angular/core';
import { FlauxFnComponent } from '@app/shared/fn/fn.component';
import { HlsComponent } from '@app/shared/hls/hls.component';
import { environment } from '../../../../../environments/environment';
import { FlauxSectionComponent } from '@app/shared/section/section.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
	selector: 'hero-section',
	standalone: true,
	imports: [HlsComponent, FlauxFnComponent, FlauxSectionComponent],
	templateUrl: './hero-section.component.html',
	styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent {
	hlsUrl = `${environment.r2BucketUrl}vid/flaux-hero-c/hls/master.m3u8`;
	posterUrl = `${environment.r2BucketUrl}img/hero-poster.jpg`;
	isMobile;
	webLandscape;

	constructor(private breakpointObserver: BreakpointObserver) {
		const breakpoints = [Breakpoints.XSmall, Breakpoints.WebLandscape];
		const breakpoint$ = this.breakpointObserver.observe(breakpoints);

		this.isMobile = toSignal(
			breakpoint$.pipe(map(result => result.breakpoints[Breakpoints.XSmall])),
			{ initialValue: false }
		);

		this.webLandscape = toSignal(
			breakpoint$.pipe(map(result => result.breakpoints[Breakpoints.WebLandscape])),
			{ initialValue: false }
		);
	}
}
