import { AfterViewInit, ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'flaux-bg',
  host: {
    '(document:mousemove)': 'mouseGlow($event)',
  },
  imports: [],
  standalone: true,
  templateUrl: './bg.component.html',
  styleUrl: './bg.component.scss',
})
export class BgComponent implements OnInit, AfterViewInit {

  interBubble!: HTMLDivElement;
  curX = 0;
  curY = 0;
  tgX = 0;
  tgY = 0;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.interBubble = document.querySelector<HTMLDivElement>('.interactive')!;
    console.debug({ interBubble: this.interBubble });
  }

  mouseGlow(event: MouseEvent) {
    this.tgX = event.clientX;
    this.tgY = event.clientY;
    this.move();
  };

  move() {
    this.curX += (this.tgX - this.curX) / 20;
    this.curY += (this.tgY - this.curY) / 20;
    this.interBubble.style.transform = `translate(${Math.round(this.curX)}px, ${Math.round(this.curY)}px)`;
    requestAnimationFrame(() => {
      this.move();
    });
  }

}
