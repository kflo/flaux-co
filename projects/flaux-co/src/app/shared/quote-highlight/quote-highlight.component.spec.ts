import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteHighlightComponent } from './quote-highlight.component';

describe('QuoteHighlightComponent', () => {
  let component: QuoteHighlightComponent;
  let fixture: ComponentFixture<QuoteHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteHighlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
