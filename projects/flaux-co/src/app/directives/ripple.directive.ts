import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
	selector: '[flauxRipple]',
	standalone: true,
})
export class RippleDirective {
	constructor(private el: ElementRef, private renderer: Renderer2) {
		const parent = this.renderer.parentNode(this.el.nativeElement);
		if (parent) {
			this.renderer.setStyle(parent, 'overflow', 'hidden');
		}
	}

	@HostListener('mousedown', ['$event'])
	onMouseDown(event: MouseEvent) {
		const ripple = this.renderer.createElement('span');
		const rect = this.el.nativeElement.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = 0;
		const y = 0;

		this.renderer.addClass(ripple, 'ripple');
		this.renderer.setStyle(ripple, 'width', `${size}px`);
		this.renderer.setStyle(ripple, 'height', `${size}px`);
		this.renderer.setStyle(ripple, 'left', `${x}px`);
		this.renderer.setStyle(ripple, 'top', `${y}px`);

		this.renderer.appendChild(this.el.nativeElement, ripple);

		ripple.addEventListener('animationend', () => {
			this.renderer.removeChild(this.el.nativeElement, ripple);
		});
	}
}
