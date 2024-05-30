import { Injectable } from '@angular/core';
import { ProductsService } from '../apis/products.service';
import { Store } from '@ngrx/store';
import { Observable, forkJoin } from 'rxjs';
import { ProductsResponse } from '../../shared/intefaces/apis/products-response';
import { PromotionsResponse } from '../../shared/intefaces/apis/promotions-response';
import { PromotionsService } from '../apis/promotions.service';
import { BodyRequest } from '../../shared/intefaces/apis/body-request';
import { SummaryResponse } from '../../shared/intefaces/apis/summary-response';
import { SummaryService } from '../apis/summary.service';
import { PurchasesResponse } from '../../shared/intefaces/apis/purchases-response';
import { PurchasesService } from '../apis/purchases.service';
import { addMonths, format } from 'date-fns';
import { AuthAppState } from 'src/app/auth/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class CashbackFacadeService {
  TOKEN_CSRF = 'default';

  constructor(
    private productsService: ProductsService,
    private promotionsService: PromotionsService,
    private summaryService: SummaryService,
    private purchasesService: PurchasesService,
    private _store: Store<{
      auth: AuthAppState;
    }>
  ) {
    _store.select('auth').subscribe(state => {
      if (state.buc) {
        this.TOKEN_CSRF = state.token ? state.token : 'x';
      }
    });
  }

  getProducts(body: BodyRequest, token: string): Observable<ProductsResponse> {
    return this.productsService.getProducts(body, token);
  }

  getPromotions(): Observable<PromotionsResponse> {
    return this.promotionsService.getPromotions(this.TOKEN_CSRF);
  }

  getSummary(body: BodyRequest, token: string): Observable<SummaryResponse> {
    const bodyRequest = { ...body };
    bodyRequest.year = format(new Date(bodyRequest.to!), 'yyyy');
    bodyRequest.month = format(addMonths(new Date(bodyRequest.from!), 1), 'MM');
    delete bodyRequest.from;
    delete bodyRequest.to;
    delete bodyRequest.mcc;
    delete bodyRequest.pageNumber;
    delete bodyRequest.pageSize;
    return this.summaryService.getSummary(bodyRequest, token);
  }

  getPurchases(
    body: BodyRequest,
    token: string
  ): Observable<PurchasesResponse> {
    return this.purchasesService.getPurchases(body, token);
  }

  getSummaryAndPurchases(
    body: BodyRequest,
    token: string
  ): Observable<[SummaryResponse, PurchasesResponse]> {
    return forkJoin([
      this.getSummary(body, token),
      this.getPurchases(body, token)
    ]);
  }
}
