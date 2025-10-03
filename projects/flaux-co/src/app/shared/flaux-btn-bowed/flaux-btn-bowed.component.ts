import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatRippleModule} from '@angular/material/core';

type ArrowDirection = 'right' | 'left' | 'up' | 'down';

@Component({
	selector: 'flaux-btn-bowed',
	standalone: true,
	imports: [MatRippleModule],
	templateUrl: './flaux-btn-bowed.component.html',
	styleUrls: ['./flaux-btn-bowed.component.scss'],
	host: { class: 'flx-arrow-button-host' }
})
export class FlauxBtnBowedComponent {
  @Input() width = 56;
  @Input() height = 56;
  /** percentages (0–100) */
  @Input() spread = 80;
  @Input() curve = 70;
  @Input() color = '#000';
  @Input() hoverColor = '#222';
  @Input() hoverShift = '4px';
  @Input() disabled = false;
  @Input() direction: ArrowDirection = 'right';

  @Output() pressed = new EventEmitter<MouseEvent>();

  get d(): string {
  	const top = (100 - this.spread) / 2;
  	const bottom = 100 - top;
  	const left = 0;
  	const cx = this.curve;

  	// Default (right-pointing)
  	let path = `M ${left} ${top} Q ${cx} 50 ${left} ${bottom} L 100 50 Z`;

  	switch (this.direction) {
  		case 'left':
  			path = `M 100 ${top} Q ${100 - cx} 50 100 ${bottom} L 0 50 Z`;
  			break;
  		case 'up':
  			path = `M ${top} 100 Q 50 ${100 - cx} ${bottom} 100 L 50 0 Z`;
  			break;
  		case 'down':
  			path = `M ${top} 0 Q 50 ${cx} ${bottom} 0 L 50 100 Z`;
  			break;
  	}
  	return path;
  }

  onClick(e: MouseEvent) {
  	if (!this.disabled) this.pressed.emit(e);
  }
}
