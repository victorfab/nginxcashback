import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitAndNavigateComponent } from './exit-and-navigate.component';

describe('ExitAndNavigateComponent', () => {
  let component: ExitAndNavigateComponent;
  let fixture: ComponentFixture<ExitAndNavigateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExitAndNavigateComponent]
    });
    fixture = TestBed.createComponent(ExitAndNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
