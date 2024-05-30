import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/intefaces/product';
import { BottomSheetService } from '../../../../shared/services/bottom-sheet.service';
import { CashbackAppState } from '../../../cashback/cashback.reducer';
import { Store } from '@ngrx/store';
import { SummaryAppState } from '../../summary.reducer';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { AuthAppState } from '../../../../auth/auth.reducer';
import { AnalyticsService } from '../../../../shared/services/analytics.service';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.scss']
})
export class ListCardsComponent implements OnInit {
  products: Product[] = [];
  currentProduct: Product | undefined;
  customerKey: string = '';

  constructor(
    private deviceService: DeviceDetectorService,
    private _analytics: AnalyticsService,
    private _bottomSheetService: BottomSheetService,
    private _gtm: GoogleTagManagerService,
    private _store: Store<{
      auth: AuthAppState;
      cashback: CashbackAppState;
      summary: SummaryAppState;
    }>
  ) {
    _store.subscribe(state => {
      this.customerKey = state.auth.buc ? state.auth.buc : '';
      this.currentProduct = state.cashback.currentProduct;
    });
  }

  ngOnInit(): void {
    this._store.select('cashback').subscribe(state => {
      this.products = state.products.filter(
        product =>
          product.associatedAccounts![0].account.contract.contractId !==
          state.currentProduct?.associatedAccounts![0].account.contract
            .contractId
      );
    });
    this._analytics.pageView(
      'cashback/popup/selecciona-tu-tarjeta',
      this.customerKey,
      this.currentProduct!
    );
  }

  selectCurrentProduct(product: Product): void {
    this._store.dispatch({
      type: '[Movements] Reset Movements'
    });
    setTimeout(() => {
      this._store.dispatch({
        type: '[Cashback] Set Current Product',
        currentProduct: product
      });
      this._gtm.pushTag({
        event: 'cashback',
        gaEventCategory: 'cashback',
        gaEventAction: 'popup_selecciona_tu_tarjeta',
        gaEventLabel: 'tarjeta_seleccionada',
        tarjeta_credito: product.product?.name?.replaceAll(' ', '_')
      });
      this._bottomSheetService.close();
    }, 100);
  }

  formatProductName(name: string,prodc:any): string {
    if(prodc.type?.toUpperCase() == 'CREDIT'){
      return "LikeU";
    }else{
      return name.length > 22 ? name.substring(0, 22) + '...' : name;
    }
  }
  
  close(): void {
    this._gtm.pushTag({
      event: 'cashback',
      gaEventCategory: 'cashback',
      gaEventAction: 'popup_selecciona_tu_tarjeta',
      gaEventLabel: 'cerrar',
      producto: ''
    });
    this._bottomSheetService.close();
  }
}