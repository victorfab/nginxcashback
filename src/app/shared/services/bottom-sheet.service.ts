import { Injectable } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { DialogConfigInterface } from '@ngx-mxflame/atoms/dialog';

@Injectable({ providedIn: 'root' })
export class BottomSheetService {
  dialogRef: DialogRef | undefined;

  constructor(private _dialog: Dialog) {}

  open(customComponent: any, config?: DialogConfigInterface) {
    this.dialogRef = this._dialog.open(customComponent, {
      maxWidth: '720px',
      panelClass: 'bottom-sheet-dialog',
      backdropClass: 'bottom-sheet-dialog-backdrop',
      ...config
    });
  }

  openError(customComponent: any, config?: DialogConfigInterface) {
    this.dialogRef = this._dialog.open(customComponent, {
      maxWidth: '720px',
      panelClass: 'bottom-sheet-dialog',
      backdropClass: 'error-sheet-dialog-backdrop',
      ...config
    });
  }

  close() {
    this.dialogRef?.close();
  }
}
