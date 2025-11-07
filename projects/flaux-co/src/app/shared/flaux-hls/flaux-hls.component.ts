import {isPlatformBrowser} from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	Input,
	PLATFORM_ID,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'flaux-hls',
	imports: [],
	standalone: true,
	templateUrl: './flaux-hls.component.html',
	styleUrl: './flaux-hls.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HlsComponent implements AfterViewInit {
	private readonly platformId = inject(PLATFORM_ID);
	private hls: import('hls.js').default | null = null;
	private destroyed = false;

	@ViewChild('videoEl', {static: true}) videoRef!: ElementRef<HTMLVideoElement>;

	/** Required: HLS master playlist URL (.m3u8) */
	@Input({required: true}) hlsUrl!: string;

	/** Optional: poster image for instant paint */
	@Input() posterUrl?: string;

	/** Optional: progressive MP4 fallback if HLS fails */
	@Input() mp4FallbackUrl?: string;

	/** Playback controls */
	@Input() muted = true;
	@Input() autoplay = true;
	@Input() loop = true;

	/** Preload hint */
	@Input() preload: 'metadata' | 'none' | 'auto' = 'metadata';

	/** hls.js option */
	@Input() capLevelToPlayerSize = true;

	/** Show MP4 fallback if HLS can’t init */
	showMp4Fallback = false;

	// Host style bindings for width and auto-centering when over 100%
	//   @HostBinding('style.width') protected hostWidth: string = '100%';
	//   @HostBinding('style.margin-left') protected hostMarginLeft: string | null = null;

	/**
	 * Optional: set host width in percent. If >100, auto-center by applying
	 * a negative left margin equal to half of the overflow.
	 * Example: 180 -> width:180%; margin-left:-40%
	 */
	//   @Input()
	//   set widthPercent(value: number | null | undefined) {
	//   	const v = Number(value);
	//   	if (!isFinite(v) || v <= 0) {
	//   		this.hostWidth = '100%';
	//   		this.hostMarginLeft = null;
	//   		return;
	//   	}
	//   	this.hostWidth = `${v}%`;
	//   	if (v > 100) {
	//   		const overflowHalf = (v - 100) / 2;
	//   		this.hostMarginLeft = `-${overflowHalf}%`;
	//   	} else {
	//   		this.hostMarginLeft = null;
	//   	}
	//   }

	async ngAfterViewInit(): Promise<void> {
		if (!isPlatformBrowser(this.platformId)) return;


		const video = this.videoRef.nativeElement;

		video.addEventListener('ended', () => {
			try {
				video.currentTime = 0;
				video.play().catch(() => { });
			} catch (err) {
				console.error(err);
			}
		});

		// Native HLS (Safari/iOS)
		if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = this.hlsUrl;
			await this.safePlay(video);
			return;
		}

		// hls.js for other browsers
		try {
			const mod = await import('hls.js');
			const Hls = mod.default;
			if (Hls.isSupported()) {
				this.hls = new Hls({
					startLevel: -1,
					capLevelToPlayerSize: this.capLevelToPlayerSize,
				});
				this.hls.loadSource(this.hlsUrl);
				this.hls.attachMedia(video);
				this.hls.on(Hls.Events.MANIFEST_PARSED, async () => {
					if (!this.destroyed) {
						await this.safePlay(video);
					}
				});
				this.hls.on(Hls.Events.ERROR, (_e: any, data: any) => {
					if (data?.fatal && this.mp4FallbackUrl && !this.showMp4Fallback) {
						this.teardownHls();
						this.showMp4Fallback = true;
					}
				});
				return;
			}
		} catch {
			// dynamic import failed; fall through to fallback if available
		}

		if (this.mp4FallbackUrl) {
			this.showMp4Fallback = true;
		}
	}

	ngOnDestroy(): void {
		this.destroyed = true;
		this.teardownHls();
	}

	private teardownHls() {
		try {
			this.hls?.destroy();
		} catch {
			console.error('hls teardown failed');
		}
		this.hls = null;
	}

	private async safePlay(video: HTMLVideoElement) {
		video.muted = this.muted;
		video.loop = this.loop;
		if (this.autoplay) {
			try {
				await video.play();
			} catch {
				/* ignore autoplay rejections */
			}
		}
	}
}
