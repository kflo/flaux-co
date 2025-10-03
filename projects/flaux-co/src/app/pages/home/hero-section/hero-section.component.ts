import { Component } from '@angular/core';
import { FlauxFnComponent } from '@app/shared/fn/fn.component';
import {HlsComponent} from '@app/shared/hls/hls.component';

@Component({
	selector: 'hero-section',
	standalone: true,
	imports: [HlsComponent, FlauxFnComponent],
	templateUrl: './hero-section.component.html',
	styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent {
	hlsUrl = 'https://cdn.flaux.co/vid/flaux-hero-c/hls/master.m3u8';
	posterUrl = 'https://cdn.flaux.co/img/hero-poster.jpg';

}
