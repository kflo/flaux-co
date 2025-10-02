import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FlauxSectionComponent} from "@app/shared/section/section.component";
import {FlauxQuoteHighlightComponent} from '@app/shared/quote-highlight/quote-highlight.component';
import {FlauxQuoteCarouselComponent} from '@components/quote-carousel/quote-carousel.component';
import {QUOTES, QuoteItem} from './quotes.data';

@Component({
	selector: 'features2-section',
	standalone: true,
	imports: [FlauxSectionComponent, FlauxQuoteHighlightComponent, FlauxQuoteCarouselComponent],
	templateUrl: './features2-section.component.html',
	styleUrl: './features2-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Features2SectionComponent {
	readonly quotes: ReadonlyArray<QuoteItem> = QUOTES;
}

// QuoteItem interface moved to quotes.data.ts
