import {
	Injectable,
	NgZone
} from '@angular/core';
import {
	Renderer,
	Program,
	Mesh,
	Triangle,
	Texture
} from 'ogl';
import {
	VERTEX_SHADER,
	FRAGMENT_SHADER
} from './prismatic-burst.shaders';

export type AnimationType = 'rotate' | 'rotate3d' | 'hover';
export type Offset = {
	x?: number | string;
	y?: number | string;
};

const hexToRgb01 = (hex: string): [number, number, number] => {
	let h = hex.trim();
	if (h.startsWith('#')) {
		h = h.slice(1);
	}
	if (h.length === 3) {
		const r = h[0];
		const g = h[1];
		const b = h[2];
		h = r + r + g + g + b + b;
	}
	const intVal = parseInt(h, 16);
	if (isNaN(intVal) || (h.length !== 6 && h.length !== 8)) {
		return [1, 1, 1];
	}
	const r = ((intVal >> 16) & 255) / 255;
	const g = ((intVal >> 8) & 255) / 255;
	const b = (intVal & 255) / 255;
	return [r, g, b];
};

const toPx = (v: number | string | undefined): number => {
	if (v == null) {
		return 0;
	}
	if (typeof v === 'number') {
		return v;
	}
	const s = String(v).trim();
	const num = parseFloat(s.replace('px', ''));
	return isNaN(num) ? 0 : num;
};


@Injectable()
export class PrismaticBurstService {
	private renderer: Renderer | null = null;
	private program: Program | null = null;
	private mesh: Mesh | null = null;
	private triangle: Triangle | null = null;
	private gradTexture: Texture | null = null;
	private resizeObserver: ResizeObserver | null = null;
	private intersectionObserver: IntersectionObserver | null = null;
	private animationFrameId: number | null = null;
	private lastTime = 0;
	private accumulatedTime = 0;
	private isVisible = true;
	private isPaused = false;
	private hoverDampness = 0;
	private mouseTarget: [number, number] = [0.5, 0.5];
	private mouseSmooth: [number, number] = [0.5, 0.5];

	constructor(private ngZone: NgZone) {}

	initialize(
		container: HTMLElement,
		intensity: number,
		speed: number,
		animationType: AnimationType,
		colors: string[] | undefined,
		distort: number,
		paused: boolean,
		offset: Offset | undefined,
		hoverDampness: number,
		rayCount: number | undefined,
		mixBlendMode: string | undefined,
		threshold = 0.25,
		quality: 'low' | 'medium' | 'high' = 'medium'
	): void {
		if (!container) {
			return;
		}

		// Adjust DPR based on quality setting for performance
		let maxDpr: number;
		switch (quality) {
			case 'low':
				maxDpr = 1;
				break;
			case 'high':
				maxDpr = 2;
				break;
			case 'medium':
			default:
				maxDpr = 1.5;
				break;
		}
		const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

		this.renderer = new Renderer({
			dpr,
			alpha: false,
			antialias: false,
			// Performance hints
			depth: false,
			stencil: false,
			premultipliedAlpha: false,
			preserveDrawingBuffer: false,
			powerPreference: 'high-performance'
		});

		const gl = this.renderer.gl;
		const canvas = gl.canvas as HTMLCanvasElement;
		canvas.style.position = 'absolute';
		canvas.style.inset = '0';
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		canvas.style.mixBlendMode = mixBlendMode && mixBlendMode !== 'none' ? mixBlendMode : '';
		container.appendChild(canvas);

		const white = new Uint8Array([255, 255, 255, 255]);
		this.gradTexture = new Texture(gl, {
			image: white,
			width: 1,
			height: 1,
			generateMipmaps: false,
			flipY: false
		});

		this.gradTexture.minFilter = gl.LINEAR;
		this.gradTexture.magFilter = gl.LINEAR;
		this.gradTexture.wrapS = gl.CLAMP_TO_EDGE;
		this.gradTexture.wrapT = gl.CLAMP_TO_EDGE;

		this.program = new Program(gl, {
			vertex: VERTEX_SHADER,
			fragment: FRAGMENT_SHADER,
			uniforms: {
				uResolution: {
					value: [1, 1] as [number, number]
				},
				uTime: {
					value: 0
				},
				uIntensity: {
					value: intensity
				},
				uSpeed: {
					value: speed
				},
				uAnimType: {
					value: this.getAnimTypeValue(animationType)
				},
				uMouse: {
					value: [0.5, 0.5] as [number, number]
				},
				uColorCount: {
					value: 0
				},
				uDistort: {
					value: distort
				},
				uOffset: {
					value: [toPx(offset?.x), toPx(offset?.y)] as [number, number]
				},
				uGradient: {
					value: this.gradTexture
				},
				uNoiseAmount: {
					value: 0.13
				},
				uRayCount: {
					value: Math.max(0, Math.floor(rayCount ?? 0))
				}
			}
		});

		this.triangle = new Triangle(gl);
		this.mesh = new Mesh(gl, {
			geometry: this.triangle,
			program: this.program
		});

		this.isPaused = paused;
		this.hoverDampness = hoverDampness;

		this.setupResizeListener(container);
		this.setupIntersectionObserver(container, threshold);
		this.setupPointerListener(container);
		this.updateGradient(colors);
		this.startAnimationLoop();
	}

	updateIntensity(value: number): void {
		if (this.program) {
			(this.program.uniforms as Record<string, any>)['uIntensity'].value = value;
		}
	}

	updateSpeed(value: number): void {
		if (this.program) {
			(this.program.uniforms as Record<string, any>)['uSpeed'].value = value;
		}
	}

	updateAnimationType(value: AnimationType): void {
		if (this.program) {
			(this.program.uniforms as Record<string, any>)['uAnimType'].value =
				this.getAnimTypeValue(value);
		}
	}

	updateColors(value: string[] | undefined): void {
		this.updateGradient(value);
	}

	updateDistort(value: number): void {
		if (this.program) {
			(this.program.uniforms as Record<string, any>)['uDistort'].value = value;
		}
	}

	updatePaused(value: boolean): void {
		this.isPaused = value;
	}

	updateOffset(value: Offset | undefined): void {
		if (!this.program) {
			return;
		}
		const ox = toPx(value?.x);
		const oy = toPx(value?.y);
		(this.program.uniforms as Record<string, any>)['uOffset'].value = [ox, oy];
	}

	updateHoverDampness(value: number): void {
		this.hoverDampness = value;
	}

	updateRayCount(value: number | undefined): void {
		if (this.program) {
			(this.program.uniforms as Record<string, any>)['uRayCount'].value = Math.max(
				0,
				Math.floor(value ?? 0)
			);
		}
	}

	updateMixBlendMode(value: string | undefined): void {
		if (this.renderer) {
			const canvas = this.renderer.gl.canvas as HTMLCanvasElement;
			canvas.style.mixBlendMode = value && value !== 'none' ? value : '';
		}
	}

	private getAnimTypeValue(type: AnimationType): number {
		const map: Record<AnimationType, number> = {
			rotate: 0,
			rotate3d: 1,
			hover: 2
		};
		return map[type];
	}

	private updateGradient(colors?: string[]): void {
		if (!this.program || !this.renderer || !this.gradTexture) {
			return;
		}

		let count = 0;
		if (Array.isArray(colors) && colors.length > 0) {
			const gl = this.renderer.gl;
			const capped = colors.slice(0, 64);
			count = capped.length;
			const data = new Uint8Array(count * 4);

			for (let i = 0; i < count; i++) {
				const [r, g, b] = hexToRgb01(capped[i]);
				data[i * 4 + 0] = Math.round(r * 255);
				data[i * 4 + 1] = Math.round(g * 255);
				data[i * 4 + 2] = Math.round(b * 255);
				data[i * 4 + 3] = 255;
			}

			this.gradTexture.image = data;
			this.gradTexture.width = count;
			this.gradTexture.height = 1;
			this.gradTexture.minFilter = gl.LINEAR;
			this.gradTexture.magFilter = gl.LINEAR;
			this.gradTexture.wrapS = gl.CLAMP_TO_EDGE;
			this.gradTexture.wrapT = gl.CLAMP_TO_EDGE;
			this.gradTexture.flipY = false;
			this.gradTexture.generateMipmaps = false;
			this.gradTexture.format = gl.RGBA;
			this.gradTexture.type = gl.UNSIGNED_BYTE;
			this.gradTexture.needsUpdate = true;
		}

		(this.program.uniforms as Record<string, any>)['uColorCount'].value = count;
	}

	private setupResizeListener(container: HTMLElement): void {
		if (!this.renderer) {
			return;
		}

		const resize = () => {
			const w = container.clientWidth || 1;
			const h = container.clientHeight || 1;
			this.renderer!.setSize(w, h);
			const gl = this.renderer!.gl;
			(this.program!.uniforms as Record<string, any>)['uResolution'].value = [
				gl.drawingBufferWidth,
				gl.drawingBufferHeight
			];
		};

		if ('ResizeObserver' in window) {
			this.resizeObserver = new ResizeObserver(resize);
			this.resizeObserver.observe(container);
		} else {
			(window as any).addEventListener('resize', resize);
		}

		resize();
	}

	private setupIntersectionObserver(container: HTMLElement, threshold = 0.25): void {
		if ('IntersectionObserver' in (window as any)) {
			this.intersectionObserver = new IntersectionObserver(
				entries => {
					if (entries[0]) {
						this.isVisible = entries[0].isIntersecting;
					}
				},
				{
					root: null,
					threshold: threshold,
					rootMargin: '0px'
				}
			);
			this.intersectionObserver.observe(container);
		}
	}

	private setupPointerListener(container: HTMLElement): void {
		const onPointer = (e: PointerEvent) => {
			const rect = container.getBoundingClientRect();
			const x = (e.clientX - rect.left) / Math.max(rect.width, 1);
			const y = (e.clientY - rect.top) / Math.max(rect.height, 1);
			this.mouseTarget = [Math.min(Math.max(x, 0), 1), Math.min(Math.max(y, 0), 1)];
		};

		container.addEventListener('pointermove', onPointer, {
			passive: true
		});
	}

	private startAnimationLoop(): void {
		if (!this.program || !this.renderer || !this.mesh) {
			return;
		}

		this.ngZone.runOutsideAngular(() => {
			this.lastTime = performance.now();
			this.accumulatedTime = 0;

			// Cache uniform references for better performance
			const uniforms = this.program!.uniforms as Record<string, any>;
			const uMouse = uniforms['uMouse'];
			const uTime = uniforms['uTime'];

			const update = (now: number) => {
				const dt = Math.max(0, now - this.lastTime) * 0.001;
				this.lastTime = now;

				const visible = this.isVisible && !document.hidden;

				if (!this.isPaused) {
					this.accumulatedTime += dt;
				}

				if (!visible) {
					this.animationFrameId = requestAnimationFrame(update);
					return;
				}

				// Mouse smoothing with exponential decay
				const tau = 0.02 + Math.max(0, Math.min(1, this.hoverDampness)) * 0.5;
				const alpha = 1 - Math.exp(-dt / tau);
				this.mouseSmooth[0] += (this.mouseTarget[0] - this.mouseSmooth[0]) * alpha;
				this.mouseSmooth[1] += (this.mouseTarget[1] - this.mouseSmooth[1]) * alpha;

				// Update uniforms directly without array spreading
				uMouse.value[0] = this.mouseSmooth[0];
				uMouse.value[1] = this.mouseSmooth[1];
				uTime.value = this.accumulatedTime;

				this.renderer!.render({
					scene: this.mesh!
				});

				this.animationFrameId = requestAnimationFrame(update);
			};

			this.animationFrameId = requestAnimationFrame(update);
		});
	}

	destroy(): void {
		if (this.animationFrameId !== null) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}
		this.resizeObserver?.disconnect();
		this.intersectionObserver?.disconnect();
		if (this.renderer) {
			const gl = this.renderer.gl;
			const canvas = gl.canvas as HTMLCanvasElement;
			try {
				if (canvas.parentNode) {
					canvas.parentNode.removeChild(canvas);
				}
			} catch {
				// Silent cleanup
			}
		}
		this.renderer = null;
		this.program = null;
		this.mesh = null;
		this.triangle = null;
		this.gradTexture = null;
		this.resizeObserver = null;
		this.intersectionObserver = null;
	}
}
