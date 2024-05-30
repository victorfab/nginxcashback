import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [ErrorComponent, ErrorDialogComponent],
  imports: [CommonModule, ErrorRoutingModule, SharedModule]
})
export class ErrorModule {}
