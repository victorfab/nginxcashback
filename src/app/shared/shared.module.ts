import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from './atoms/atoms.module';
import { MoleculesModule } from './molecules/molecules.module';
import { BottomSheetService } from './services/bottom-sheet.service';
import { AnalyticsService } from './services/analytics.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, AtomsModule, MoleculesModule],
  exports: [AtomsModule, MoleculesModule],
  providers: [BottomSheetService, AnalyticsService]
})
export class SharedModule {}
