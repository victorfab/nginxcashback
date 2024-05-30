import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniquerewardsSliderComponent } from './uniquerewards-slider.component';

describe('UniquerewardsSliderComponent', () => {
  let component: UniquerewardsSliderComponent;
  let fixture: ComponentFixture<UniquerewardsSliderComponent>;

  beforeEach(() => {
    component = new UniquerewardsSliderComponent();
    TestBed.configureTestingModule({
      declarations: [UniquerewardsSliderComponent]
    });
    fixture = TestBed.createComponent(UniquerewardsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
