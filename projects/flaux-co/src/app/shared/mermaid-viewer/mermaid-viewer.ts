import {
	Component, Input, OnChanges, inject, signal
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import mermaid from 'mermaid';

@Component({
	selector: 'app-mermaid-viewer',
	standalone: true,
	imports: [],
	templateUrl: './mermaid-viewer.html',
	styleUrl: './mermaid-viewer.scss'
})
export class MermaidViewerComponent implements OnChanges {
  @Input() code: string = '';

  // Using Angular Signals for modern state management
  fullscreen = signal(false);

  svgHtml: SafeHtml | null = null;
  error: string | null = null;
  private sanitizer = inject(DomSanitizer);

  constructor() {
  	mermaid.initialize({
  		startOnLoad: false, theme: 'base'
  	});
  }

  toggleFullscreen() {
  	this.fullscreen.update(v => !v);
  	// Optional: Lock body scroll when fullscreen
  	if (this.fullscreen()) {
  		document.body.style.overflow = 'hidden';
  	} else {
  		document.body.style.overflow = '';
  	}
  }

  async ngOnChanges() {
  	if (this.code) await this.renderDiagram();
  }

  async renderDiagram() {
  	try {
  		this.error = null;
  		const id = `mermaid-${Math.random().toString(36).substring(2)}`;
  		const { svg } = await mermaid.render(id, this.code);
  		this.svgHtml = this.sanitizer.bypassSecurityTrustHtml(svg);
  	} catch (e) {
  		console.error(e);
  		this.error = 'Error rendering chart';
  	}
  }
}
