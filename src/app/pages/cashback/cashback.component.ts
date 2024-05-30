import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CashbackFacadeService } from '../../services/facades/cashback-facade.service';
import { Store } from '@ngrx/store';
import { CashbackAppState } from './cashback.reducer';
import { Product } from '@ngx-mxflame/models';
import { AuthAppState } from 'src/app/auth/auth.reducer';
import { SummaryAppState } from '../summary/summary.reducer';
import { FlameLoaderService } from '@ngx-mxflame/atoms/loader-overlay';
import { ProductsResponse } from '../../shared/intefaces/apis/products-response';
import { CallbacksService } from '../../shared/services/callbacks.service';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  selector: 'app-cashback',
  templateUrl: './cashback.component.html',
  styleUrls: ['./cashback.component.scss']
})
export class CashbackComponent implements OnInit {
  products: Product[] = [];
  CLIENT_ID: string | undefined;
  TOKEN_CSRF = 'default';

  constructor(
    private _loader: FlameLoaderService,
    private router: Router,
    private _gtmService: GoogleTagManagerService,
    private _analitycs: AnalyticsService,
    private cashbackFacadeService: CashbackFacadeService,
    private _callbacksService: CallbacksService,
    private _store: Store<{
      auth: AuthAppState;
      cashback: CashbackAppState;
      summary: SummaryAppState;
    }>
  ) {
    _store.select('auth').subscribe(state => {
      if (!state.buc) {
        this.router.navigateByUrl('pages/error/401');
      } else {
        this.CLIENT_ID = state.buc;
        this.TOKEN_CSRF = state.token ? state.token : 'x';
      }
    });
  }

  ngOnInit(): void {
    const _loader = this._loader.open();
    this.cashbackFacadeService
      .getProducts({ customerKey: this.CLIENT_ID }, this.TOKEN_CSRF)
      .subscribe({
        next: (products: ProductsResponse) => {
          let resp: any = products;
          if (!resp.errors) {
            if (products && products.products) {
              this.products = products.products;
              this._store.dispatch({
                type: '[Cashback] Set Products',
                products: this.products,
                currentProduct:
                  this.products && this.products.length > 0
                    ? this.products[0]
                    : null
              });
            } else {
              this.products = [];
              // error para mostrar mensaje sin productos
              this._analitycs.pageView('cashback/error/', this.CLIENT_ID!, {});
              this._gtmService.pushTag({
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
            _loader.close();
            this.router.navigateByUrl('pages/cashback/summary');
          } else {
            _loader.close();
            this.router.navigateByUrl('pages/error/401');
          }
        },
        error: err => {
          _loader.close();
          this.router.navigateByUrl('pages/error/401');
        }
      });
  }

  backToSM() {
    this._gtmService.pushTag({
      event: 'cashback',
      gaEventCategory: 'cashback',
      gaEventAction: 'back-to-sm',
      gaEventLabel: 'callback',
      producto: ''
    });
    this._callbacksService.goToRoot();
  }

  tagEvent(label: string, button: string) {
    this._gtmService.pushTag({
      event: 'cashback',
      gaEventCategory: 'cashback',
      gaEventAction: label,
      gaEventLabel: button,
      producto: '',
      periodicidad: '',
      marca: ''
    });
  }
}
