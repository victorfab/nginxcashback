import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/intefaces/product';
import { BottomSheetService } from '../../../../shared/services/bottom-sheet.service';
import { ListCardsComponent } from '../list-cards/list-cards.component';
import { CashbackAppState } from '../../../cashback/cashback.reducer';
import { Store } from '@ngrx/store';
import { SummaryAppState } from '../../summary.reducer';
import { AnalyticsService } from '../../../../shared/services/analytics.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  cards: Product[] = [];
  product: Product | undefined;

  constructor(
    private _store: Store<{
      cashback: CashbackAppState;
      summary: SummaryAppState;
    }>,
    private _bottomSheetService: BottomSheetService,
    private _analytics: AnalyticsService
  ) {}

  ngOnInit(): void {
    this._store.select('cashback').subscribe(state => {
      this.cards = state.products;
      this.product = state.currentProduct;
    });
  }

  openListProducts(): void {
    if (this.cards.length > 1) {
      this._bottomSheetService.open(ListCardsComponent);
      this._analytics.eventTag(
        'desglose_mensual',
        'en_tu_tarjeta',
        this.product!
      );
    }
  }

  formatProductName(name: string,prodc:any): string {
    if(prodc.type?.toUpperCase() == 'CREDIT'){
      return "LikeU";
    }else{
      return name.length > 22 ? name.substring(0, 22) + '...' : name;
    }
  }
}