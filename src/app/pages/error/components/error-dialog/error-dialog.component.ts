import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BottomSheetService } from '../../../../shared/services/bottom-sheet.service';
import { AnalyticsService } from '../../../../shared/services/analytics.service';
import { AuthAppState } from '../../../../auth/auth.reducer';
import { Store } from '@ngrx/store';
import { CashbackAppState } from '../../../cashback/cashback.reducer';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { CallbacksService } from 'src/app/shared/services/callbacks.service';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements AfterViewInit {
  url: string = '';
  customerKey: string | undefined;
  constructor(
    private router: Router,
    private _callbacksService: CallbacksService,
    private _analitycs: AnalyticsService,
    private _store: Store<{
      auth: AuthAppState;
    }>,
    private _gtm: GoogleTagManagerService
  ) {
    _store.select('auth').subscribe(auth => {
      this.customerKey = auth.buc!;
    });
  }

  ngAfterViewInit(): void {
    this.url = this.router.url;
    this._analitycs.pageView('cashback/error', this.customerKey!, {});
    this._gtm.pushTag({
      event: 'cashback',
      gaEventCategory: 'error',
      gaEventAction: 'cashback/error',
      gaEventLabel:
        'Por el momento no podemos atender tu solicitud Por favor intentalo mas tarde'.replaceAll(
          ' ',
          '_'
        )
    });
  }

  close(): void {
    this._callbacksService.goToRoot();
    /*     if (this.url === '/pages/cashback/summary') {
      this.bottomSheetService.close();
    } */
  }
}
