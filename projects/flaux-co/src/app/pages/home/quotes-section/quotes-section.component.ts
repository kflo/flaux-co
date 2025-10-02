import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FlauxSectionComponent} from "@app/shared/section/section.component";
import {FlauxQuoteHighlightComponent} from '@app/shared/quote-highlight/quote-highlight.component';
import {FlauxQuoteCarouselComponent} from '@components/quote-carousel/quote-carousel.component';
import {QUOTES, QuoteItem} from './quotes.data';

@Component({
	selector: 'quotes-section',
	standalone: true,
	imports: [FlauxSectionComponent, FlauxQuoteHighlightComponent, FlauxQuoteCarouselComponent],
	templateUrl: './quotes-section.component.html',
	styleUrl: './quotes-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesSectionComponent {
	next() {
		throw new Error('Method not implemented.');
	}
	goTo(arg0: number) {
		throw new Error('Method not implemented.');
	}
	prev() {
		throw new Error('Method not implemented.');
	}
	readonly quotes: ReadonlyArray<QuoteItem> = QUOTES;
	current: any;
}

// QuoteItem interface moved to quotes.data.ts
