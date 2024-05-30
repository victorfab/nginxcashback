import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { BottomSheetService } from '../../../../shared/services/bottom-sheet.service';
import { CallbacksService } from '../../../../shared/services/callbacks.service';
import { AnalyticsService } from '../../../../shared/services/analytics.service';
import { AuthAppState } from '../../../../auth/auth.reducer';
import { Store } from '@ngrx/store';
import { PurchasesAppState } from '../../../movements/movements.reducer';
import { SummaryAppState } from '../../../summary/summary.reducer';
import { FiltersAppState } from '../../../filters/filters.reducer';
import { CashbackAppState } from '../../../cashback/cashback.reducer';

@Component({
  selector: 'app-exit-and-navigate',
  templateUrl: './exit-and-navigate.component.html',
  styleUrls: ['./exit-and-navigate.component.scss']
})
export class ExitAndNavigateComponent implements OnInit {
  url: string = '';
  customerKey: string | undefined;
  currentProduct: any;

  constructor(
    @Inject(DIALOG_DATA) public data: any,
    private _bottomSheet: BottomSheetService,
    private callbacksService: CallbacksService,
    private _store: Store<{
      auth: AuthAppState;
      cashback: CashbackAppState;
    }>,
    private _analytics: AnalyticsService
  ) {
    this.url = data.url;
    _store.select('auth').subscribe(auth => {
      this.customerKey = auth.buc ? auth.buc : undefined;
    });
    _store.select('cashback').subscribe(cashback => {
      this.currentProduct = cashback.currentProduct;
    });
  }

  close() {
    this._bottomSheet.close();
    this._analytics.eventTag('bottom_alert', 'Cancelar', this.currentProduct!);
  }

  navigate() {
    if (this.url) {
      this._analytics.eventTag(
        'bottom_alert',
        'conoce_mas',
        this.currentProduct!
      );
      this.callbacksService.openUrlAndCloseSession(this.url);
    }
    this.close();
  }

  ngOnInit() {
    this._analytics.pageView(
      'cashback/bottom-alert',
      this.customerKey!,
      this.currentProduct
    );
  }
}
