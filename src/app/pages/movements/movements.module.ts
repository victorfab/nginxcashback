import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementsComponent } from './movements.component';
import { MovementItemComponent } from './components/movement-item/movement-item.component';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { purchasesReducer } from './movements.reducer';
import { FiltersModule } from '../filters/filters.module';

@NgModule({
  declarations: [MovementsComponent, MovementItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    FiltersModule,
    StoreModule.forFeature('purchases', purchasesReducer)
  ],
  exports: [MovementsComponent]
})
export class MovementsModule {}
