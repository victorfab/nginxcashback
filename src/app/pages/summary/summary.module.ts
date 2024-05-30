import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { SharedModule } from './../../shared/shared.module';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ListCardsComponent } from './components/list-cards/list-cards.component';
import { MonthlySummaryComponent } from './components/monthly-summary/monthly-summary.component';
import { SummaryByMccComponent } from './components/summary-by-mcc/summary-by-mcc.component';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';
import { StoreModule } from '@ngrx/store';
import { summaryReducer } from './summary.reducer';
import { MovementsModule } from '../movements/movements.module';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    SummaryComponent,
    CardItemComponent,
    ListCardsComponent,
    MonthlySummaryComponent,
    SummaryByMccComponent,
    ProgressbarComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    SharedModule,
    MovementsModule,
    StoreModule.forFeature('summary', summaryReducer)
  ]
})
export class SummaryModule {}
