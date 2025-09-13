import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Features2SectionComponent } from './features2-section.component';

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
});
