import { Component, OnInit } from '@angular/core';
import { BottomSheetService } from 'src/app/shared/services/bottom-sheet.service';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  constructor(private _bottomSheet: BottomSheetService) {}

  ngOnInit(): void {
    this._bottomSheet.openError(ErrorDialogComponent);
  }
}
