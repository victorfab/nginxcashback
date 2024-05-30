import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashbackRoutingModule } from './cashback-routing.module';
import { CashbackComponent } from './cashback.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { cashbackReducer } from './cashback.reducer';

@NgModule({
  declarations: [CashbackComponent],
  imports: [
    CommonModule,
    CashbackRoutingModule,
    SharedModule,
    StoreModule.forFeature('cashback', cashbackReducer)
  ]
})
export class CashbackModule {}
