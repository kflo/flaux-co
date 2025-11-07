import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fn } from './fn';

describe('Fn', () => {
  let component: Fn;
  let fixture: ComponentFixture<Fn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
