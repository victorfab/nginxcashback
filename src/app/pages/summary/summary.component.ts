import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FlameLoaderService } from '@ngx-mxflame/atoms/loader-overlay';
import { Product } from '../../shared/intefaces/product';
import { AuthAppState } from '../../auth/auth.reducer';
import { CashbackAppState } from '../cashback/cashback.reducer';
import {
  EmptyState,
  EmptyStateImage
} from 'src/app/shared/intefaces/empty-state';
import { SummaryAppState } from './summary.reducer';
import { SummaryResponse } from '../../shared/intefaces/apis/summary-response';
import { CashbackFacadeService } from '../../services/facades/cashback-facade.service';
import { Subscription } from 'rxjs';
import { CashBackAmounts } from '../../shared/intefaces/cashback-amounts';
import { ActivityAmountCashBack } from '../../shared/intefaces/activity-amount-cashback';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { format, startOfMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import { DOCUMENT } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnDestroy, OnInit {
  $storeSubscription: Subscription | undefined;
  products: Product[] = [];
  errorSummary: EmptyState = {
    title: 'Ocurrió un error',
    message:
      'Por el momento no podemos atender tu solicitud. Por favor, inténtalo más tarde.',
    image: EmptyStateImage.place
  };
  summary: SummaryResponse | undefined;
  customerKey: string | undefined;
  currentProduct: Product | undefined;
  accountId: string | undefined = '';
  TOKEN_CSRF = 'default';
  cashbackAmounts: CashBackAmounts | undefined;
  activityAmountCashBack: ActivityAmountCashBack[] = [];

  constructor(
    @Inject(DOCUMENT) document: any,
    private deviceService: DeviceDetectorService,
    private _loader: FlameLoaderService,
    private _analytics: AnalyticsService,
    private cashbackFacadeService: CashbackFacadeService,
    private _gtm: GoogleTagManagerService,
    private _store: Store<{
      auth: AuthAppState;
      cashback: CashbackAppState;
      summary: SummaryAppState;
    }>
  ) {
    this.$storeSubscription = this._store.select('auth').subscribe(state => {
      if (state.buc) {
        this.customerKey = state.buc;
        this.TOKEN_CSRF = state.token ? state.token : 'x';
      }
    });
    this.$storeSubscription.add(
      this._store.select('cashback').subscribe(state => {
        this.products = state.products;
        if (state.currentProduct) {
          this.currentProduct = state.currentProduct;
          this.getSummaryAndPurchases();
        }
      })
    );
    this.$storeSubscription.add(
      _store.select('summary').subscribe(state => {
        this.summary = state.summary;
        this.cashbackAmounts = state.summary?.cardTransaction
          ? state.summary?.cardTransaction
          : undefined;
        this.activityAmountCashBack = state.summary?.cashbackCategory
          ? state.summary?.cashbackCategory
          : [];
      })
    );
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.$storeSubscription?.unsubscribe();
  }

  getSummaryAndPurchases(): void {
    const loaderRef = this._loader.open();
    this.accountId =
      this.currentProduct?.associatedAccounts![0].account.contract.contractId;
    this.cashbackFacadeService
      .getSummaryAndPurchases(
        {
          accountId: this.accountId,
          customerKey: this.customerKey,
          typeCode:
            this.currentProduct?.type?.toUpperCase() == 'CREDIT' ? 'C' : 'D',
          from: format(startOfMonth(new Date()), 'yyyy-MM-dd', {
            locale: es
          }),
          to: format(new Date(), 'yyyy-MM-dd', { locale: es }),
          mcc: '',
          purchasesFilter: true,
          pageNumber: 0,
          pageSize: 10
        },
        this.TOKEN_CSRF
      )
      .subscribe({
        next: ([summary, purchases]) => {
          this._store.dispatch({
            type: '[Summary] Set Summary By Period',
            summary: summary
          });
          this._store.dispatch({
            type: '[Movements] Load Movements',
            purchases: purchases
          });
          this._store.dispatch({
            type: '[Filters] Set Filters',
            period: 'current',
            mcc: ''
          });
          this._store.dispatch({
            type: '[Movements] Load Movements',
            purchases: purchases
          });
          this._store.dispatch({
            type: '[Filters] Set Filters',
            period: 'current',
            mcc: ''
          });
          this.summary = summary;
          this._analytics.pageView(
            'cashback/desglose-mensual',
            this.customerKey!,
            this.currentProduct!
          );
          if (summary.errors && summary.errors.length > 0) {
            this._analytics.pageView(
              'cashback/desglose-mensual/error',
              this.customerKey!,
              this.currentProduct!
            );
            this._gtm.pushTag({
              event: 'cashback',
              gaEventCategory: 'error',
              gaEventAction: 'cashback/desglose-mensual/error',
              gaEventLabel:
                'Por el momento no podemos mostrar el Cashback que acumulaste Por favor intentalo mas tarde'.replaceAll(
                  ' ',
                  '_'
                )
            });
          }
          if (purchases.errors && purchases.errors.length > 0) {
            this._analytics.pageView(
              'cashback/desglose-mensual/error',
              this.customerKey!,
              this.currentProduct!
            );
            this._gtm.pushTag({
              event: 'cashback',
              gaEventCategory: 'error',
              gaEventAction: 'cashback/desglose-mensual/error',
              gaEventLabel:
                'Este mes no realizaste compras que generaron Cashback. Por favor, consulta un mes diferente'.replaceAll(
                  ' ',
                  '_'
                )
            });
          }
          loaderRef.close();
        },
        error: err => {
          console.log(err);
          loaderRef.close();
          this._gtm.pushTag({
            event: 'cashback',
            gaEventCategory: 'error',
            gaEventAction: 'cashback/error',
            gaEventLabel: this.errorSummary.title
          });
        },
        complete: () => {
          loaderRef.close();
        }
      });
  }
}
