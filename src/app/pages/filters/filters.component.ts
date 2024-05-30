import { Component, OnInit } from '@angular/core';
import { format, lastDayOfMonth, startOfMonth, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { BottomSheetService } from '../../shared/services/bottom-sheet.service';
import { FiltersAppState } from './filters.reducer';
import { Store } from '@ngrx/store';
import { BodyRequest } from '../../shared/intefaces/apis/body-request';
import { CashbackFacadeService } from '../../services/facades/cashback-facade.service';
import { SummaryAppState } from '../summary/summary.reducer';
import { PurchasesAppState } from '../movements/movements.reducer';
import { SummaryResponse } from '../../shared/intefaces/apis/summary-response';
import { Purchase } from '../../shared/intefaces/purchase';
import { AuthAppState } from 'src/app/auth/auth.reducer';
import { Product } from '../../shared/intefaces/product';
import { CashbackAppState } from '../cashback/cashback.reducer';
import { take } from 'rxjs';
import { FlameLoaderService } from '@ngx-mxflame/atoms/loader-overlay';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { PurchasesResponse } from '../../shared/intefaces/apis/purchases-response';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  summary: SummaryResponse | undefined;
  purchases: Purchase[] = [];
  customerKey: string | undefined;
  currentProduct: Product | undefined;
  TOKEN_CSRF = 'default';

  periodSelected: string = 'current';
  mccSelected: string = '';

  periodFilters = [
    {
      name: '',
      value: 'current'
    },
    {
      name: '',
      value: 'past'
    },
    {
      name: '',
      value: 'before'
    }
  ];

  mccFilters = [
    {
      icon: '',
      name: 'Todos',
      value: ''
    },
    {
      icon: 'gas-station',
      name: 'Gasolineras',
      value: 'Gas'
    },
    {
      icon: 'health-insurance',
      name: 'Farmacias',
      value: 'Far'
    },
    {
      icon: 'restaurant-bar',
      name: 'Restaurantes',
      value: 'Res'
    },
    {
      icon: 'ticket-movie',
      name: 'Entretenimiento',
      value: 'Ent'
    }
  ];

  constructor(
    private _bottonSheetService: BottomSheetService,
    private _loader: FlameLoaderService,
    private _cashbackFacadeService: CashbackFacadeService,
    private _analytics: AnalyticsService,
    private _gtm: GoogleTagManagerService,
    private _store: Store<{
      auth: AuthAppState;
      cashback: CashbackAppState;
      summary: SummaryAppState;
      purchases: PurchasesAppState;
      filters: FiltersAppState;
    }>
  ) {
    this._store.select('filters').subscribe(({ period, mcc }) => {
      this.periodSelected = period;
      this.mccSelected = mcc;
    });
    this._store.subscribe(state => {
      this.currentProduct = state.cashback.currentProduct;
      this.summary = state.summary.summary;
      this.purchases = state.purchases.purchases;
      this.customerKey = state.auth.buc!;
      this.TOKEN_CSRF = state.auth.token ? state.auth.token : 'x';
    });
  }

  getNameMonth(month: number): string {
    let nameMonth = '';
    switch (month) {
      case 0:
        nameMonth = 'Mes Actual';
        break;
      case 1:
        nameMonth = format(subMonths(new Date(), 1), 'MMMM', { locale: es });
        break;
      case 2:
        nameMonth = format(subMonths(new Date(), 2), 'MMMM', { locale: es });
        break;
      default:
        break;
    }
    return nameMonth;
  }

  applyFilters(): void {
    const loader = this._loader.open();
    this._gtm.pushTag({
      event: 'cashback',
      gaEventCategory: 'cashback',
      gaEventAction: 'popup_filtro_de_movimientos',
      gaEventLabel: 'aplicar_filtros',
      periodicidad: this.getNameMonth(
        this.periodFilters.map(pf => pf.value).indexOf(this.periodSelected)
      ),
      marca: this.mccFilters
        .find(mcc => mcc.value == this.mccSelected)
        ?.name.toLowerCase()
    });
    const body = this.getBodyRequest(this.periodSelected, this.mccSelected);
    this._cashbackFacadeService
      .getSummaryAndPurchases(body, this.TOKEN_CSRF)
      .subscribe({
        next: ([summary, purchases]) => {
          if (purchases.errors && purchases.errors.length > 0) {
            purchases = {
              purchases: [],
              paginationMetadata: {
                pageNumber: 0,
                pageSize: 0,
                totalPages: 0,
                count: 0,
                totalRecords: 0
              }
            };
            this._store.dispatch({
              type: '[Movements] Reset Movements'
            });
            this._analytics.pageView(
              'cashback/error/',
              this.customerKey!,
              this.currentProduct!
            );
            this._gtm.pushTag({
              event: 'cashback',
              gaEventCategory: 'error',
              gaEventAction: 'cashback/error',
              gaEventLabel:
                'Por el momento no podemos mostrar el Cashback que acumulaste Por favor intentalo mas tarde'.replaceAll(
                  ' ',
                  '_'
                )
            });
          }
          if (summary.errors && summary.errors.length > 0) {
            this._analytics.pageView(
              'cashback/error/',
              this.customerKey!,
              this.currentProduct!
            );
            this._gtm.pushTag({
              event: 'cashback',
              gaEventCategory: 'error',
              gaEventAction: 'cashback/error',
              gaEventLabel:
                'Este mes no realizaste compras que generaron Cashback. Por favor, consulta un mes diferente'.replaceAll(
                  ' ',
                  '_'
                )
            });
          }
          let respSummary: SummaryResponse = summary;
          let respPurchases: PurchasesResponse = purchases;
          if (!respSummary.errors) {
            this._store.dispatch({
              type: '[Summary] Set Summary By Period',
              summary
            });
          } else {
            this._store.dispatch({
              type: '[Summary] Set Summary By Period',
              summary: undefined
            });
          }
          if (!respPurchases.errors) {
            this._store.dispatch({
              type: '[Movements] Reset Movements'
            });
            this._store.dispatch({
              type: '[Movements] Load Movements',
              purchases
            });
          } else {
            this._store.dispatch({
              type: '[Movements] Reset Movements'
            });
          }
          this._store.dispatch({
            type: '[Filters] Set Filters',
            period: this.periodSelected,
            mcc: this.mccSelected
          });
          loader.close();
        },
        error: () => {
          loader.close();
        },
        complete: () => {
          loader.close();
        }
      });
    this._bottonSheetService.close();
  }

  getBodyRequest(period: string, mcc: string): BodyRequest {
    let currentDate = new Date();
    const body: BodyRequest = {};
    switch (period) {
      case 'current':
        body.from = format(startOfMonth(new Date()), 'yyyy-MM-dd', {
          locale: es
        });
        body.to = format(currentDate, 'yyyy-MM-dd', { locale: es });
        break;
      case 'past':
        body.from = format(
          startOfMonth(subMonths(currentDate, 1)),
          'yyyy-MM-dd',
          {
            locale: es
          }
        );
        body.to = format(
          lastDayOfMonth(subMonths(currentDate, 1)),
          'yyyy-MM-dd',
          { locale: es }
        );
        break;
      case 'before':
        body.from = format(
          startOfMonth(subMonths(currentDate, 2)),
          'yyyy-MM-dd',
          {
            locale: es
          }
        );
        body.to = format(
          lastDayOfMonth(subMonths(currentDate, 2)),
          'yyyy-MM-dd',
          { locale: es }
        );
        break;
      default:
        break;
    }
    body.typeCode =
      this.currentProduct?.type?.toUpperCase() == 'CREDIT' ? 'C' : 'D';
    if (mcc) {
      body.mcc = mcc;
    }
    body.customerKey = this.customerKey;
    body.purchasesFilter=true;
    body.accountId =
      this.currentProduct!.associatedAccounts![0]!.account.contract.contractId;
    return body;
  }

  close(): void {
    this._analytics.eventTag(
      'popup_filtro_de_movimientos',
      'cancelar',
      this.currentProduct!
    );
    this._bottonSheetService.close();
  }

  selectPeriod(period: string) {
    this.periodSelected = period;
  }

  selectMcc(mcc: string) {
    this.mccSelected = mcc;
  }

  ngOnInit() {
    this._analytics.pageView(
      'cashback/popup/filtro-de-movimientos',
      this.customerKey!,
      this.currentProduct!
    );
  }
}
