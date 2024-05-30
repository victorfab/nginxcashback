import { Component, OnInit } from '@angular/core';
import { PromotionsState } from './promotions.reducer';
import { Store } from '@ngrx/store';
import { PromotionsService } from '../../services/apis/promotions.service';
import { map } from 'rxjs';
import { PromotionsResponse } from '../../shared/intefaces/apis/promotions-response';
import { AuthAppState } from '../../auth/auth.reducer';
import { CashbackAppState } from '../cashback/cashback.reducer';
import { Promotion } from '../../shared/intefaces/promotion';
import { EmptyStateImage } from '../../shared/intefaces/empty-state';
import { FlameLoaderService } from '@ngx-mxflame/atoms/loader-overlay';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { Product } from '../../shared/intefaces/product';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  promotions: Promotion[] = [];
  uniqueRewards: Promotion[] = [];

  customerKey: string | undefined;
  currentProduct: Product | undefined;
  TOKEN_CSRF = 'default';

  errorPromotions = {
    title: 'Sin Promos Cashback',
    message:
      'Por el momento no tenemos Promo Cashback disponible. Por favor, inténtalo más tarde.',
    image: EmptyStateImage.box
  };

  constructor(
    private _analytics: AnalyticsService,
    private _loader: FlameLoaderService,
    private store: Store<{
      auth: AuthAppState;
      cashback: CashbackAppState;
      promotions: PromotionsState;
    }>,
    private promotionsService: PromotionsService
  ) {
    this.store.subscribe(data => {
      this.promotions = data.promotions.promotions;
      this.customerKey = data.auth.buc!;
      this.currentProduct = data.cashback.currentProduct;
      this.TOKEN_CSRF = data.auth.token ? data.auth.token : 'x';
    });
  }

  ngOnInit(): void {
    const loader = this._loader.open();
    this.promotionsService
      .getPromotions(this.TOKEN_CSRF)
      .pipe(map((promotionss: PromotionsResponse) => promotionss.promotions))
      .subscribe({
        next: promotions => {
          let title: string =
            promotions && promotions.length > 0
              ? 'promo'
              : 'sin-promos-cashback';
          this._analytics.pageView(
            `cashback/${title}`,
            this.customerKey!,
            this.currentProduct!
          );

          if (promotions !== undefined) {
            const resultUnique = promotions.filter((obj: Promotion) => {
              return obj.isUniqueRewards === true;
            });
            const resultPromotions = promotions.filter((obj: Promotion) => {
              return obj.isUniqueRewards === false;
            });
            promotions = resultPromotions;
            this.uniqueRewards = resultUnique;

            if(resultUnique.length==0||resultPromotions.length==0){
              promotions=[]; 
              this.uniqueRewards =[];
            }

            this.store.dispatch({
              type: '[Promotions] Set Promotions',
              promotions
            });
            this.store.dispatch({
              type: '[Unique] Set Unique',
              resultUnique
            });
            loader.close();
          } else {
            loader.close();
          }
        },
        error: error => {
          loader.close();
        }
      });
  }
}