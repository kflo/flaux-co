import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Features2SectionComponent} from './features2-section.component';

describe('Features2SectionComponent', () => {
  let component: Features2SectionComponent;
  let fixture: ComponentFixture<Features2SectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Features2SectionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Features2SectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should advance to next slide', () => {
    const first = component.current;
    component.next();
    expect(component.current).toBe((first + 1) % component.quotes.length);
  });

  it('should go to specific index', () => {
    component.goTo(3);
    expect(component.current).toBe(3);
  });

  it('should wrap on prev', () => {
    component.current = 0;
    component.prev();
    expect(component.current).toBe(component.quotes.length - 1);
  });
});
