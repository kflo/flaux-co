import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[scrollFilter]',
})
export class ScrollFilterDirective implements OnInit, OnDestroy {
  @Input('scrollFilter') filterFn!: (visible: number) => string;
  private handler = () => this.applyFilter();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    window.addEventListener('scroll', this.handler);
    this.applyFilter();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.handler);
  }

  private applyFilter() {
    const el = this.el.nativeElement;
    const elRect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Progress: 0 when element's top is at bottom of viewport, 1 when at top of viewport
    const progress = 1 - Math.max(
      0,
      Math.min(1, elRect.top / (viewportHeight - elRect.height))
    );

    console.debug({ viewportHeight, elRectHeight: elRect.height, elRectTop: elRect.top, progress });

    if (this.filterFn) {
      el.style.filter = this.filterFn(progress);
    }
  }
}
