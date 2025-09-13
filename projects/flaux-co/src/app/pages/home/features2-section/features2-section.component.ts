import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlauxSectionComponent } from "@app/shared/section/section.component";
import { FlauxFnComponent } from "@app/shared/fn/fn.component";
import { FlauxQuoteHighlightComponent } from '@app/shared/quote-highlight/quote-highlight.component';

@Component({
  selector: 'features2-section',
  standalone: true,
  imports: [FlauxSectionComponent, FlauxFnComponent, FlauxQuoteHighlightComponent],
  templateUrl: './features2-section.component.html',
  styleUrl: './features2-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Features2SectionComponent {}
