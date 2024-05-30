import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { FLAME_ATOMS, FLAME_SERVICES } from './flame-atoms';
import { DialogModule } from '@angular/cdk/dialog';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { EmptyStatesComponent } from './empty-states/empty-states.component';

@NgModule({
  declarations: [EmptyStateComponent, EmptyStatesComponent],
  imports: [CommonModule, OverlayModule, DialogModule, ...FLAME_ATOMS],
  exports: [OverlayModule, DialogModule, EmptyStateComponent, ...FLAME_ATOMS],
  providers: [...FLAME_SERVICES]
})
export class AtomsModule {}
