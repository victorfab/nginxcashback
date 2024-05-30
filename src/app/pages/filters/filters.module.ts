import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { filtersReducer } from './filters.reducer';

@NgModule({
  declarations: [FiltersComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('filters', filtersReducer)
  ],
  exports: [FiltersComponent]
})
export class FiltersModule {}
