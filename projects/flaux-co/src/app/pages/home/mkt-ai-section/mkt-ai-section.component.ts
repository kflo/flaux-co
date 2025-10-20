import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FlauxSectionComponent} from '@app/shared/section/section.component';
import { CarouselItem, FlauxCarouselComponent } from "@app/shared/flaux-carousel/flaux-carousel.component";
import {environment} from 'projects/flaux-co/environments/environment';

@Component({
	selector: 'mkt-ai-section',
	imports: [FlauxSectionComponent, FlauxCarouselComponent],
	templateUrl: './mkt-ai-section.component.html',
	styleUrl: './mkt-ai-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MktAiSectionComponent {
	public carouselItems: CarouselItem[] = [
		{
			id: 6,
			text: 'Coming Soon!',
			imageUrl: `${environment.r2BucketUrl}img/mkt/ai/AI Workforce Team/AI Salesperson.png`,
			heading: 'Salesperson',
			subheading: 'Closing Deals, Around the Clock',
			description: 'Your go-to for nurturing prospects and closing new business. The Salesperson interacts with leads across multiple channels, offering personalized responses and moving prospects through the sales funnel.',
			linkUrl: null
		},
		{
			id: 3,
			text: 'Drives awareness and engagement with customers wherever they are. Drafts, schedules, and posts content for websites, blogs, and social media platforms that will educate leads and drive new business.',
			imageUrl: `${environment.r2BucketUrl}img/mkt/ai/AI Workforce Team/AI Content Creator.png`,
			heading: 'AI Content Creator',
			subheading: 'Content That Connects',
			linkUrl: '/contact'
		},
		{
			id: 1,
			text: 'Have an AI employee available 24/7 to capture leads, answer customer questions, and provide a delightful experience that gets more customers. And keeps them.',
			imageUrl: `${environment.r2BucketUrl}img/mkt/ai/AI Workforce Team/AI Receptionist.png`,
			heading: 'AI Receptionist',
			subheading: 'Never leave a lead waiting',
			description: `<h6>Out of the box, AI Receptionist can:</h6>
				<ul class="checkmark-list">
					<li>Engage website visitors and answer calls.</li>
					<li>Use business data for fast and accurate responses 24/7.</li>
					<li>Capture leads directly into Vendasta's CRM for easy follow-up.</li>
					<li>Schedule appointments and follow up via SMS.</li>
				</ul>`,
			linkUrl: '/contact'
		},
		{
			id: 2,
			text: 'Helps businesses get chosen by more customers. Crafts thoughtful responses to reviews, posts on behalf of the business, and generates review requests to get more positive feedback and handle negative ones.',
			imageUrl: `${environment.r2BucketUrl}img/mkt/ai/AI Workforce Team/AI Reputation Specialist.png`,
			heading: 'AI Reputation Specialist',
			subheading: 'Crafting Your Online Image',
			description: `<h6>Out of the box, AI Reputation Specialist can help craft your online image by:</h6>
				<ul class="checkmark-list">
					<li>asking for Net Promoter Scores</li>
					<li>requesting reviews from promoters</li>
					<li>preparing responses for detractors</li>
					<li>responding to reviews across platforms</li>
				</ul>`,
			linkUrl: '/contact'
		},
		{
			id: 4,
			text: 'Coming Soon!',
			imageUrl: `${environment.r2BucketUrl}img/mkt/ai/AI Workforce Team/AI SEO Expert.png`,
			heading: 'SEO Expert',
			subheading: 'Rank Higher, Get Found',
			description: 'Boost your online visibility with an AI-driven SEO Expert. Optimizes website content, suggests keywords, and monitors performance to help your business rank higher in search results and attract more customers.',
			linkUrl: null
		},
		{
			id: 5,
			text: 'Coming Soon!',
			imageUrl: `${environment.r2BucketUrl}img/mkt/ai/AI Workforce Team/AI Sales Assistant.png`,
			heading: 'Sales Assistant',
			subheading: 'Your Always-On Sales Support',
			description: 'Win more business with every call. Transcribe, analyze, and summarize sales activity to capture key insights and provide actionable tips to gain new customers.',
			linkUrl: null
		},

	];
}
