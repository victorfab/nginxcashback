import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryByMccComponent } from './summary-by-mcc.component';

describe('SummaryByMccComponent', () => {
  let component: SummaryByMccComponent;
  let fixture: ComponentFixture<SummaryByMccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryByMccComponent]
    });
    fixture = TestBed.createComponent(SummaryByMccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
