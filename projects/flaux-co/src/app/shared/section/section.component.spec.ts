import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlauxSectionComponent } from './section.component';

describe('FlauxSectionComponent', () => {
  let component: FlauxSectionComponent;
  let fixture: ComponentFixture<FlauxSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlauxSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlauxSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
