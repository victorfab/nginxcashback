import { Component, Input } from '@angular/core';
import { Promotion } from '../../../../shared/intefaces/promotion';
import { ExitAndNavigateComponent } from '../exit-and-navigate/exit-and-navigate.component';
import { BottomSheetService } from '../../../../shared/services/bottom-sheet.service';
import { AnalyticsService } from '../../../../shared/services/analytics.service';

@Component({
  selector: 'app-promotions-slider',
  templateUrl: './promotions-slider.component.html',
  styleUrls: ['./promotions-slider.component.scss']
})
export class PromotionsSliderComponent {
  @Input() promotions: Promotion[] = [];
  @Input() title: any = '';

  constructor(
    private _bottomSheet: BottomSheetService,
    private _analytics: AnalyticsService
  ) {}

  clickViewMore(): void {
    const url = 'https://www.santander.com.mx/cashback/promociones-unicas/';
    this._analytics.eventTag(
      'Ver_mas_promociones_unicas',
      'Ver_mas',
      this.title!
    );
    this.openUrlAndExit(url);
  }

  openUrlAndExit(url: string) {
    const config = {
      title: '',
      panelClass: 'bottom-sheet-container--exit-and-navigate',
      data: {
        url
      }
    };
    this._bottomSheet.open(ExitAndNavigateComponent, config);
  }
}
