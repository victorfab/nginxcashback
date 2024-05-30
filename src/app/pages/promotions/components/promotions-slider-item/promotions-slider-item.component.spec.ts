import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsSliderItemComponent } from './promotions-slider-item.component';

describe('PromotionsSliderItemComponent', () => {
  let component: PromotionsSliderItemComponent;
  let fixture: ComponentFixture<PromotionsSliderItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionsSliderItemComponent]
    });
    fixture = TestBed.createComponent(PromotionsSliderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
