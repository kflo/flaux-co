import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export interface SeoConfig {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  twitterCard?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
	private readonly title = inject(Title);
	private readonly meta = inject(Meta);
	private readonly doc = inject(DOCUMENT);
	private readonly platformId = inject(PLATFORM_ID);

	update(config: SeoConfig) {
		const title = config.title ?? 'Flaux | AI Partner for Growth';
		const description = config.description ?? 'AI agents, automation, and marketing for SMBs.';
		const image = config.image ?? '/assets/img/hero-poster.jpg';
		const twitterCard = config.twitterCard ?? 'summary_large_image';

		const url = config.url ?? (isPlatformBrowser(this.platformId) ? (this.doc?.location?.href ?? 'https://flaux.co/') : 'https://flaux.co/');

		// Standard
		this.title.setTitle(title);
		this.meta.updateTag({ name: 'description',
			content: description });

		// Open Graph
		this.meta.updateTag({ property: 'og:type',
			content: 'website' });
		this.meta.updateTag({ property: 'og:title',
			content: title });
		this.meta.updateTag({ property: 'og:description',
			content: description });
		this.meta.updateTag({ property: 'og:image',
			content: image });
		this.meta.updateTag({ property: 'og:url',
			content: url });

		// Twitter
		this.meta.updateTag({ name: 'twitter:card',
			content: twitterCard });
		this.meta.updateTag({ name: 'twitter:title',
			content: title });
		this.meta.updateTag({ name: 'twitter:description',
			content: description });
		this.meta.updateTag({ name: 'twitter:image',
			content: image });

		// Canonical link
		this.setCanonical(url);
	}

	private setCanonical(url: string) {
		const head = this.doc?.getElementsByTagName('head')?.[0];
		if (!head) return;
		let link: HTMLLinkElement | null = this.doc.querySelector("link[rel='canonical']");
		if (!link) {
			link = this.doc.createElement('link');
			link.setAttribute('rel', 'canonical');
			head.appendChild(link);
		}
		link.setAttribute('href', url);
	}
}

