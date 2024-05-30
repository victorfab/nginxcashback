import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionsRoutingModule } from './promotions-routing.module';
import { PromotionsComponent } from './promotions.component';
import { SharedModule } from './../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { promotionsReducer } from './promotions.reducer';
import { PromotionsSliderComponent } from './components/promotions-slider/promotions-slider.component';
import { UniquerewardsSliderComponent } from './components/uniquerewards-slider/uniquerewards-slider.component';

import { PromotionsSliderItemComponent } from './components/promotions-slider-item/promotions-slider-item.component';
import { ExitAndNavigateComponent } from './components/exit-and-navigate/exit-and-navigate.component';

@NgModule({
  declarations: [
    PromotionsComponent,
    PromotionsSliderComponent,
    PromotionsSliderItemComponent,
    ExitAndNavigateComponent,
    UniquerewardsSliderComponent
  ],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    SharedModule,
    StoreModule.forFeature('promotions', promotionsReducer)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PromotionsModule {}
