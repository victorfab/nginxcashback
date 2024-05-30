import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PurchasesAppState } from './movements.reducer';
import { Purchase } from '../../shared/intefaces/purchase';
import { Product } from '../../shared/intefaces/product';
import { BottomSheetService } from '../../shared/services/bottom-sheet.service';
import {
  EmptyState,
  EmptyStateImage
} from '../../shared/intefaces/empty-state';
import { FiltersComponent } from '../filters/filters.component';
import { CashbackFacadeService } from '../../services/facades/cashback-facade.service';
import { take } from 'rxjs';
import { BodyRequest } from '../../shared/intefaces/apis/body-request';
import { AuthAppState } from '../../auth/auth.reducer';
import { SummaryAppState } from '../summary/summary.reducer';
import { FiltersAppState } from '../filters/filters.reducer';
import { format, lastDayOfMonth, startOfMonth, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { FlameLoaderService } from '@ngx-mxflame/atoms/loader-overlay';
import { ErrorDialogComponent } from '../error/components/error-dialog/error-dialog.component';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent {
  purchases: Purchase[] = [];
  currentProduct: Product | undefined;
  customerKey: string | undefined;
  TOKEN_CSRF = 'default';
  startPage = 1;
  paginationLimit = 10;
  totalPages = 0;
  pageSize: number | undefined;
  @Input() accountId: string | undefined;
  mcc: string | undefined;
  period: string | undefined;
  errorSummary: EmptyState = {
    title: 'Cashback no disponible',
    message:
      'Este mes no realizaste compras que generaron Cashback. Por favor, consulta un mes diferente.',
    image: EmptyStateImage.document
  };

  constructor(
    private _store: Store<{
      cashback: Product;
      purchases: PurchasesAppState;
      auth: AuthAppState;
      summary: SummaryAppState;
      filters: FiltersAppState;
    }>,
    private _loader: FlameLoaderService,
    private _bottomSheetService: BottomSheetService,
    private _cashbackFacadeService: CashbackFacadeService,
    private _analytics: AnalyticsService
  ) {
    _store.select('purchases').subscribe(purchases => {
      this.startPage = 1;
      this.purchases = [];
      this.purchases = purchases.purchases;
      this.pageSize = purchases.paginationMetadata.count;
      this.totalPages = Math.ceil(this.pageSize / 10);
      if (purchases.purchases?.length === 0) {
        this._store.dispatch({
          type: '[Movements] Reset Movements'
        });
      }
    });
    _store.select('auth').subscribe(auth => {
      this.customerKey = auth.buc ? auth.buc : undefined;
      this.TOKEN_CSRF = auth.token ? auth.token : 'x';
    });
    _store.select('filters').subscribe(filters => {
      this.period = filters.period;
      this.mcc = filters.mcc;
    });
    _store.subscribe(state => {
      this.customerKey = state.auth.buc ? state.auth.buc : '';
      this.currentProduct = state.cashback;
    });
  }

  openFilters(): void {
    this._bottomSheetService.open(FiltersComponent);
    this._analytics.eventTag(
      'desglose_mensual',
      'filtrar',
      this.currentProduct!.currentProduct.type
    );
  }

  getMoreMovements(): void {
    const loader = this._loader.open();
    const body: BodyRequest = {
      customerKey: this.customerKey,
      accountId: this.accountId,
      from: this.getPeriod(this.period!).from,
      to: this.getPeriod(this.period!).to,
      mcc: this.mcc,
      pageNumber: this.startPage,
      pageSize: 10,
      purchasesFilter: true,
      typeCode:
        this.currentProduct!.currentProduct.type.toUpperCase() === 'CREDIT'
          ? 'C'
          : 'D'
    };
    this._cashbackFacadeService
      .getPurchases(body, this.TOKEN_CSRF)
      .pipe(take(1))
      .subscribe({
        next: purchases => {
          let resp: any = purchases;
          if (!resp.errors) {
            if (this.startPage === this.totalPages) {
              loader.close();
            } else {
              this.startPage = this.startPage + 1;
              this._analytics.eventTag(
                'desglose_mensual',
                'ver_mas',
                this.currentProduct!.currentProduct.type
              );
              this.purchases.push(...purchases.purchases);
              loader.close();
            }
          } else {
            loader.close();
            this._bottomSheetService.open(ErrorDialogComponent);
          }
        },
        error: () => {
          loader.close();
        }
      });

    loader.close();
  }

  getPeriod(period: string): { from: string; to: string } {
    const periodSelected: { from: string; to: string } = {
      from: '',
      to: ''
    };
    switch (period) {
      case 'current':
        periodSelected.from = format(startOfMonth(new Date()), 'yyyy-MM-dd', {
          locale: es
        });
        periodSelected.to = format(new Date(), 'yyyy-MM-dd', { locale: es });
        break;
      case 'past':
        periodSelected.from = format(
          startOfMonth(subMonths(new Date(), 1)),
          'yyyy-MM-dd',
          {
            locale: es
          }
        );
        periodSelected.to = format(
          lastDayOfMonth(subMonths(new Date(), 1)),
          'yyyy-MM-dd',
          { locale: es }
        );
        break;
      case 'before':
        periodSelected.from = format(
          startOfMonth(subMonths(new Date(), 2)),
          'yyyy-MM-dd',
          {
            locale: es
          }
        );
        periodSelected.to = format(
          lastDayOfMonth(subMonths(new Date(), 2)),
          'yyyy-MM-dd',
          { locale: es }
        );
        break;
      default:
        break;
    }
    return periodSelected;
  }
}
