import { Component, Input } from '@angular/core';

@Component({
  selector: 'flaux-quote-highlight',
  imports: [],
  templateUrl: './quote-highlight.component.html',
  styleUrl: './quote-highlight.component.scss'
})
export class FlauxQuoteHighlightComponent {
  @Input() quoteStart = '';
  @Input() highlight = '';
  @Input() quoteEnd = '';
  @Input() source = '';

}
