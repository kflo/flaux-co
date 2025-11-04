import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GoogleAnalyticsService {
	private pageLoadTime: number = performance.now();

	constructor() {
		this.initializeGoogleAnalytics();
	}

	private initializeGoogleAnalytics(): void {
		const measurementId = environment.firebaseConfig.measurementId;

		if (!measurementId) {
			console.warn('Google Analytics measurement ID not configured');
			return;
		}

		// Load gtag script
		this.loadGtagScript(measurementId);

		// Initialize dataLayer and gtag function
		this.initializeGtag();

		// Configure analytics
		this.configureGtag(measurementId);

		// Track page load performance
		this.trackPageLoadMetrics();
	}

	private loadGtagScript(measurementId: string): void {
		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
		document.head.appendChild(script);
	}

	private initializeGtag(): void {
		if (!(window as any).dataLayer) {
			(window as any).dataLayer = [];
		}

		if (!(window as any).gtag) {
			(window as any).gtag = (...args: any[]) => {
				(window as any).dataLayer.push(args);
			};
		}

		(window as any).gtag('js', new Date());
	}

	private configureGtag(measurementId: string): void {
		(window as any).gtag('config', measurementId, {
			'send_page_view': true
		});
	}

	/**
	 * Track page load performance metrics
	 */
	private trackPageLoadMetrics(): void {
		// Wait for page to fully load before tracking
		if (document.readyState === 'complete') {
			this.sendPageLoadMetrics();
		} else {
			window.addEventListener('load', () => this.sendPageLoadMetrics());
		}
	}

	private sendPageLoadMetrics(): void {
		const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

		if (perfData) {
			this.trackEvent('page_load', {
				'page_path': window.location.pathname,
				'page_title': document.title,
				'dns_time': Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
				'tcp_time': Math.round(perfData.connectEnd - perfData.connectStart),
				'ttfb': Math.round(perfData.responseStart - perfData.requestStart),
				'dom_interactive': Math.round(perfData.domInteractive - perfData.fetchStart),
				'dom_complete': Math.round(perfData.domComplete - perfData.fetchStart),
				'load_time': Math.round(perfData.loadEventEnd - perfData.fetchStart)
			});
		}
	}

	/**
	 * Track custom events
	 * @param eventName Event name
	 * @param eventParams Event parameters
	 */
	public trackEvent(eventName: string, eventParams?: Record<string, any>): void {
		if ((window as any).gtag) {
			(window as any).gtag('event', eventName, eventParams);
		}
	}

	/**
	 * Set user properties
	 * @param properties User properties
	 */
	public setUserProperties(properties: Record<string, any>): void {
		if ((window as any).gtag) {
			(window as any).gtag('set', properties);
		}
	}

	/**
	 * Get the measurement ID from environment
	 */
	public getMeasurementId(): string {
		return environment.firebaseConfig.measurementId;
	}
}
