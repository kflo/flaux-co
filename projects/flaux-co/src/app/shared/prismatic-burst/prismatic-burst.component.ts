import {
	Component,
	Input,
	OnInit,
	OnDestroy,
	ViewChild,
	ElementRef,
	ChangeDetectionStrategy,
	computed,
	inject
} from '@angular/core';
import {
	PrismaticBurstService,
	AnimationType,
	Offset
} from './prismatic-burst.service';
import { UxService } from '../../services/ux.service';

@Component({
	selector: 'flaux-prismatic-burst',
	standalone: true,
	providers: [PrismaticBurstService],
	template: '<div #container class="prismatic-burst-container"></div>',
	styleUrls: ['./prismatic-burst.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrismaticBurstComponent implements OnInit, OnDestroy {
	@ViewChild('container', { static: true })
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

	private burstService: PrismaticBurstService = inject(PrismaticBurstService);
	private uxService: UxService = inject(UxService);

	// Computed quality based on mobile detection
	private computedQuality = computed(() => {
		const isMobile = this.uxService.isMobile();
		// Force 'low' on mobile for much better performance
		return isMobile ? 'low' : this.quality;
	});

	// Computed animation type: use 'rotate' on mobile instead of 'rotate3d'
	private computedAnimationType = computed(() => {
		const isMobile = this.uxService.isMobile();
		if (isMobile) return 'rotate';
		return this.animationType;
	});

	// Computed ray count: reduce on mobile for better performance
	private computedRayCount = computed(() => {
		const isMobile = this.uxService.isMobile();
		if (isMobile && this.rayCount) {
			// Cut ray count in half on mobile
			return Math.max(0, Math.floor(this.rayCount / 2));
		}
		return this.rayCount;
	});

	ngOnInit(): void {
		this.burstService.initialize(
			this.container.nativeElement,
			this.intensity,
			this.speed,
			this.computedAnimationType(),
			this.colors,
			this.distort,
			this.paused,
			this.offset,
			this.hoverDampness,
			this.computedRayCount(),
			this.mixBlendMode,
			this.threshold,
			this.computedQuality()
		);
	}

	ngOnDestroy(): void {
		this.burstService.destroy();
	}
}
