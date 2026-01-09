import { Component, ChangeDetectionStrategy, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlauxSectionComponent } from '@app/shared/flaux-section/flaux-section.component';
import { FooterComponent } from '@app/shared/footer/footer.component';

@Component({
	selector: 'flaux-demo',
	standalone: true,
	imports: [CommonModule, FlauxSectionComponent, FooterComponent],
	templateUrl: './demo.page.html',
	styleUrls: ['./demo.page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoPage {
	public readonly images = [
		{
			src: 'assets/img/agency/ai-web-chat-collage.png',
			caption: 'AI-driven web chat solutions to capture leads and engage customers instantly.'
		},
		{
			src: 'assets/img/agency/ai-employee-4-collage.png',
			caption: 'Automate complex business tasks with our custom-trained AI employees.'
		},
		{
			src: 'assets/img/agency/ai-employee-5-collage.png',
			caption: 'Scale your operations by deploying intelligent AI workforces across your organization.'
		},
		{
			src: 'assets/img/agency/ai-sales-assistant-collage.png',
			caption: 'Boost conversion rates with AI sales assistants that manage your pipeline 24/7.'
		},
		{
			src: 'assets/img/agency/Vendasta-AI-SEO-Expert-collage.webp',
			caption: 'Dominate local search and visibility with AI-powered SEO strategies and audits.'
		},
		{
			src: 'assets/img/agency/Executive Report.png',
			caption: 'Gain deep business insights with our comprehensive and transparent executive reporting.'
		},
		{
			src: 'assets/img/agency/Campaign-performance.png',
			caption: 'Real-time data visualization of your multi-channel digital marketing performance.'
		},
		{
			src: 'assets/img/agency/AI-Receptionist-booking-appointments.webp',
			caption: 'Never miss a booking with 24/7 AI-powered appointment scheduling and management.'
		},
		{
			src: 'assets/img/agency/AI-Workforce-assisting-with-business-information.webp',
			caption: 'Empower your team with an AI workforce that manages critical business data and FAQs.'
		},
		{
			src: 'assets/img/agency/social-ads.png',
			caption: 'High-performance social advertising campaigns designed to drive growth and ROI.'
		},
		{
			src: 'assets/img/agency/Reputation-Overview.png',
			caption: 'Monitor and manage your brand\'s digital reputation across all major review platforms.'
		},
		{
			src: 'assets/img/agency/Content-Writer-collage.webp',
			caption: 'Generate high-quality, SEO-optimized content at scale with our AI writing workforce.'
		},
		{
			src: 'assets/img/agency/Campaign-automation.png',
			caption: 'Streamline your marketing efforts with fully automated, multi-stage lead nurturing.'
		},
		{
			src: 'assets/img/agency/Capture-more-leads-with-converstations-ai-img.webp',
			caption: 'Engage prospects across SMS and Web Chat with our unified Conversations AI platform.'
		},
		{
			src: 'assets/img/agency/Local-SEO-group.png',
			caption: 'Enhance your local authority with precision-targeted SEO and directory optimizations.'
		},
		{
			src: 'assets/img/agency/Reputation Management group.png',
			caption: 'Proactively gather and respond to reviews with automated reputation management tools.'
		},
		{
			src: 'assets/img/agency/SM-AI-Knowledge_v1.png',
			caption: 'Infuse your social media strategy with deep, industry-specific AI knowledge models.'
		},
		{
			src: 'assets/img/agency/Business-App-callouts2.webp',
			caption: 'Access all your digital tools and performance metrics in one central Business App dashboard.'
		},
		{
			src: 'assets/img/agency/Attract-convert-engage.webp',
			caption: 'A complete marketing funnel solution: Attract new customers, convert leads, and engage fans.'
		},
		{
			src: 'assets/img/agency/Capture-more-leads-with-converstations-ai-img-1-1.webp',
			caption: 'Multi-channel lead capture solutions designed to maximize your digital sales potential.'
		},
		{
			src: 'assets/img/agency/AI-Salesperson-responding-to-messages.webp',
			caption: 'Real-time AI response systems to keep your sales pipeline moving day and night.'
		},
		{
			src: 'assets/img/agency/AI-Receptionist-web-chat.webp',
			caption: '24/7 AI-managed web chat to provide instant support for every website visitor.'
		},
		{
			src: 'assets/img/agency/SM-AI-BulkPost-Creation.png',
			caption: 'Automate your social media presence with bulk AI-generated content and scheduling.'
		},
		{
			src: 'assets/img/agency/Campaign-Dynamic-fields.png',
			caption: 'Personalize customer interactions at scale using dynamic data fields in your campaigns.'
		},
		{
			src: 'assets/img/agency/AI-Content-Creator-blog-post.webp',
			caption: 'Revolutionize your blog with high-engagement articles created by our AI content team.'
		},
		{
			src: 'assets/img/agency/AI-Receptionist-channels.webp',
			caption: 'Connect with customers on their favorite platforms via our multi-channel AI receptionist.'
		},
		{
			src: 'assets/img/agency/AI-Reputation-Specialist-NPS-survey.webp',
			caption: 'Automatically measure customer satisfaction and loyalty with AI-driven NPS surveys.'
		},
		{
			src: 'assets/img/agency/AI-Sales-Assistant-CRM.webp',
			caption: 'Integrate smart AI assistants directly into your CRM for seamless lead management.'
		},
		{
			src: 'assets/img/agency/SEO-Expert-Local-SEO.webp',
			caption: 'Expert-level local SEO tactics powered by data-driven AI analysis and insights.'
		},
		{
			src: 'assets/img/agency/Social Marketing post performance.webp',
			caption: 'Analyze social engagement patterns to refine and optimize your digital marketing strategy.'
		},
		{
			src: 'assets/img/agency/SM-AI-Knowledge_v2.png',
			caption: 'Leverage advanced data models that learn your business to deliver superior social content.'
		},
		{
			src: 'assets/img/agency/Reputation-Specialist-reponding-to-reviews.webp',
			caption: 'Maintain a stellar online presence with automated, intelligent review responses.'
		},
		{
			src: 'assets/img/agency/CRM-Automataic Opportunity.png',
			caption: 'Identify and capitalize on new deals with automated CRM opportunity tracking.'
		},
		{
			src: 'assets/img/agency/calendarHero.png',
			caption: 'Unified scheduling solutions that sync perfectly with your existing business workflows.'
		},
		{
			src: 'assets/img/agency/Conversations AI - webchat.png',
			caption: 'Human-like web chat interactions powered by our sophisticated language models.'
		},
		{
			src: 'assets/img/agency/NPS-Automate-Feedback.png',
			caption: 'Close the loop on customer satisfaction with automated sentiment analysis.'
		},
		{
			src: 'assets/img/agency/Local-SEO-Listings-near-me.png',
			caption: 'Ensure your business appears exactly where your customers are searching for you.'
		},
		{
			src: 'assets/img/agency/ad-placement-group.png',
			caption: 'Strategic ad placements across the web to maximize your brand reach and impact.'
		},
		{
			src: 'assets/img/agency/Add to campaign.png',
			caption: 'Easily scale your marketing by adding new leads to data-optimized nurturing funnels.'
		}
	];

	selectedImageIndex = signal<number | null>(null);
	isZoomed = signal(false);
	isDragging = signal(false);

	panX = signal(0);
	panY = signal(0);

	private dragStartX = 0;
	private dragStartY = 0;
	private touchStartX = 0;
	private touchStartY = 0;
	private wasDragged = false;

	@HostListener('window:keydown', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		if (this.selectedImageIndex() === null) return;

		if (event.key === 'ArrowRight') {
			this.navigate('next');
		} else if (event.key === 'ArrowLeft') {
			this.navigate('prev');
		} else if (event.key === 'Escape') {
			this.closeLightbox();
		}
	}

	openLightbox(index: number) {
		this.selectedImageIndex.set(index);
		this.resetZoom();
		document.body.style.overflow = 'hidden';
	}

	closeLightbox() {
		this.selectedImageIndex.set(null);
		this.resetZoom();
		document.body.style.overflow = 'auto';
	}

	private resetZoom() {
		this.isZoomed.set(false);
		this.isDragging.set(false);
		this.wasDragged = false;
		this.panX.set(0);
		this.panY.set(0);
	}

	navigate(direction: 'prev' | 'next', event?: Event) {
		if (event) event.stopPropagation();
		const current = this.selectedImageIndex();
		if (current === null) return;

		let nextIndex: number;
		if (direction === 'next') {
			nextIndex = (current + 1) % this.images.length;
		} else {
			nextIndex = (current - 1 + this.images.length) % this.images.length;
		}

		this.selectedImageIndex.set(nextIndex);
		this.resetZoom();
	}

	toggleZoom(event: MouseEvent) {
		event.stopPropagation();
		if (this.wasDragged) {
			this.wasDragged = false;
			return;
		}

		const newState = !this.isZoomed();
		this.isZoomed.set(newState);
		if (!newState) {
			this.panX.set(0);
			this.panY.set(0);
		}
	}

	// --------------------------------------------------------------------------
	// PANNING & GESTURES
	// --------------------------------------------------------------------------

	onMouseDown(event: MouseEvent) {
		if (!this.isZoomed()) return;
		event.preventDefault(); // Prevents ghosting
		this.startDragging(event.clientX, event.clientY);
	}

	@HostListener('window:mousemove', ['$event'])
	onMouseMove(event: MouseEvent) {
		if (!this.isDragging()) return;
		this.updatePan(event.clientX, event.clientY);
	}

	@HostListener('window:mouseup')
	onMouseUp() {
		this.isDragging.set(false);
	}

	onTouchStart(event: TouchEvent) {
		const touch = event.touches[0];
		this.touchStartX = touch.clientX;
		this.touchStartY = touch.clientY;

		if (this.isZoomed()) {
			this.startDragging(touch.clientX, touch.clientY);
		}
	}

	@HostListener('window:touchmove', ['$event'])
	onTouchMove(event: TouchEvent) {
		if (!this.isDragging() || !this.isZoomed()) return;
		const touch = event.touches[0];
		this.updatePan(touch.clientX, touch.clientY);
	}

	onTouchEnd(event: TouchEvent) {
		if (this.isDragging()) {
			this.isDragging.set(false);
			// For touch, we don't have a 'click' event after 'touchend' in the same way
			// if we preventDefault, but here we want to ensure we don't swipe.
			return;
		}

		const touchEndX = event.changedTouches[0].clientX;
		const swipeThreshold = 50;

		if (this.touchStartX - touchEndX > swipeThreshold) {
			this.navigate('next');
		} else if (touchEndX - this.touchStartX > swipeThreshold) {
			this.navigate('prev');
		}
	}

	private startDragging(clientX: number, clientY: number) {
		this.isDragging.set(true);
		this.wasDragged = false;
		this.dragStartX = clientX - this.panX();
		this.dragStartY = clientY - this.panY();
	}

	private updatePan(clientX: number, clientY: number) {
		const newPanX = clientX - this.dragStartX;
		const newPanY = clientY - this.dragStartY;

		// Set wasDragged if moved more than 5px
		if (Math.abs(newPanX - this.panX()) > 2 || Math.abs(newPanY - this.panY()) > 2) {
			this.wasDragged = true;
		}

		this.panX.set(newPanX);
		this.panY.set(newPanY);
	}
}
