import { Component } from '@angular/core';
import { FlauxFnComponent } from '@app/shared/fn/fn.component';
import {HlsComponent} from '@app/shared/hls/hls.component';
import {environment} from '../../../../../environments/environment';
import {FlauxSectionComponent} from '@app/shared/section/section.component';

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

}
