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
			id: 1,
			text: 'Provide fast, helpful responses through phone, chat, text, or connected sites. Answer questions, promote products and services, book appointments, and handle support issues —all hands-off!',
			imageUrl: `${environment.r2BucketUrl}img/mkt/ai/AI Receptionist.png`,
			heading: 'AI Receptionist',
			subheading: 'Coming Soon',
			linkUrl: null
		},
		{
			id: 2,
			text: 'Helps businesses get chosen by more customers. Crafts thoughtful responses to reviews, posts on behalf of the business, and generates review requests to get more positive feedback and handle negative ones.',
			imageUrl: `${environment.r2BucketUrl}img/mkt/ai/AI Reputation Specialist.png`,
			heading: 'AI Reputation Specialist',
			subheading: 'Coming Soon',
			linkUrl: null
		},
		{
			id: 3,
			text: 'Drives awareness and engagement with customers wherever they are. Drafts, schedules, and posts content for websites, blogs, and social media platforms that will educate leads and drive new business.',
			imageUrl: `${environment.r2BucketUrl}img/mkt/ai/AI Content Creator.png`,
			heading: 'AI Content Creator',
			subheading: 'Coming Soon',
			linkUrl: null
		},
		{
			id: 4,
			text: null,
			imageUrl: `${environment.r2BucketUrl}img/mkt/ai/AI SEO Expert.png`,
			heading: 'SEO Expert',
			subheading: 'Coming Soon',
			linkUrl: null
		},
		{
			id: 5,
			text: null,
			imageUrl: `${environment.r2BucketUrl}img/mkt/ai/AI Sales Assistant.png`,
			heading: 'Sales Assistant',
			subheading: 'Coming Soon',
			linkUrl: null
		},
		{
			id: 6,
			text: null,
			imageUrl: `${environment.r2BucketUrl}img/mkt/ai/AI Salesperson.png`,
			heading: 'Salesperson',
			subheading: 'Coming Soon',
			linkUrl: null
		},
	];
}
