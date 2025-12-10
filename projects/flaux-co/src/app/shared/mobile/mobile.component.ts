import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { UxService } from '@app/services/ux.service';

@Component({
	selector: 'mobile',
	standalone: true,
	template: `
    @if (isMobile()) {
      <ng-content></ng-content>
    } @else {
      <ng-content select="[desktop]"></ng-content>
    }
  `,
	styles: [`
    :host {
      display: contents;
    }
  `],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileComponent {
	isMobile = inject(UxService).isMobile;
}
