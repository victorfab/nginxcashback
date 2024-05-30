import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsSliderComponent } from './promotions-slider.component';

describe('PromotionsSliderComponent', () => {
  let component: PromotionsSliderComponent;
  let fixture: ComponentFixture<PromotionsSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionsSliderComponent]
    });
    fixture = TestBed.createComponent(PromotionsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
