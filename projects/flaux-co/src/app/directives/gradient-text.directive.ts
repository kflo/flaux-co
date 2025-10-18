import {
	Directive,
	ElementRef,
	OnInit,
	Renderer2,
	Input
} from '@angular/core';

@Directive({
	selector: '[flauxGradientText]',
	standalone: true,
})
export class GradientTextDirective implements OnInit {
	@Input('flauxGradientText') customGradient?: string;

	constructor(private el: ElementRef, private renderer: Renderer2) {}

	ngOnInit() {
		const gradient = this.customGradient || 'linear-gradient(140deg, #fff, #bbb)';

		// Apply the gradient text styles
		this.renderer.setStyle(this.el.nativeElement, 'background-image', gradient);
		this.renderer.setStyle(this.el.nativeElement, 'background-clip', 'text');
		this.renderer.setStyle(this.el.nativeElement, '-webkit-background-clip', 'text');
		this.renderer.setStyle(this.el.nativeElement, 'color', 'transparent');
		this.renderer.setStyle(this.el.nativeElement, 'display', 'inline-block');
	}
}
