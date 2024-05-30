import { Component, Input } from '@angular/core';
import { BottomSheetService } from '../../../../shared/services/bottom-sheet.service';
import { ExitAndNavigateComponent } from '../exit-and-navigate/exit-and-navigate.component';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Store } from '@ngrx/store';
import { AuthAppState } from '../../../../auth/auth.reducer';

@Component({
  selector: 'app-promotions-slider-item',
  templateUrl: './promotions-slider-item.component.html',
  styleUrls: ['./promotions-slider-item.component.scss']
})
export class PromotionsSliderItemComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() strongText: string = '';
  @Input() image: string | undefined = '';
  @Input() url: string = '';
  @Input() isUniqueRewards: boolean = false;
  partyId: string = '';

  constructor(
    private _bottomSheet: BottomSheetService,
    private _gtm: GoogleTagManagerService,
    private _store: Store<{ auth: AuthAppState }>
  ) {
    _store.select('auth').subscribe(state => {
      this.partyId = state.buc!;
    });
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
    this._gtm.pushTag({
      event: 'cashback',
      gaEventCategory: 'cashback',
      gaEventAction: this.description.replaceAll(' ', '_'),
      gaEventLabel: 'conoce_mas',
      userId: this.partyId,
      producto: this.title
    });
  }
}
