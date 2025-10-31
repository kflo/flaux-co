import {
	Component,
	Input,
	OnInit,
	OnDestroy,
	ViewChild,
	ElementRef,
	ChangeDetectionStrategy
} from '@angular/core';
import {
	PrismaticBurstService,
	AnimationType,
	Offset
} from './prismatic-burst.service';

@Component({
	selector: 'flaux-prismatic-burst',
	standalone: true,
	providers: [PrismaticBurstService],
	template: '<div #container class="prismatic-burst-container"></div>',
	styleUrls: ['./prismatic-burst.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrismaticBurstComponent implements OnInit, OnDestroy {
	@ViewChild('container', {
		static: true
	})
		container!: ElementRef<HTMLDivElement>;

	@Input()
		intensity = 2;

	@Input()
		speed = 0.5;

	@Input()
		animationType: AnimationType = 'rotate3d';

	@Input()
		colors: string[] | undefined;

	@Input()
		distort = 0;

	@Input()
		paused = false;

	@Input()
		offset: Offset | undefined;

	@Input()
		hoverDampness = 0;

	@Input()
		rayCount: number | undefined;

	@Input()
		mixBlendMode: string | undefined = 'lighten';

	@Input()
		threshold = 0.25; // How much of the component should be visible before animating

	@Input()
		quality: 'low' | 'medium' | 'high' = 'medium'; // Performance vs quality tradeoff

	constructor(private burstService: PrismaticBurstService) {}

	ngOnInit(): void {
		this.burstService.initialize(
			this.container.nativeElement,
			this.intensity,
			this.speed,
			this.animationType,
			this.colors,
			this.distort,
			this.paused,
			this.offset,
			this.hoverDampness,
			this.rayCount,
			this.mixBlendMode,
			this.threshold,
			this.quality
		);
	}

	ngOnDestroy(): void {
		this.burstService.destroy();
	}
}
