import { Component, Input } from '@angular/core';
import { ActivityAmountCashBack } from '../../../../shared/intefaces/activity-amount-cashback';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent {
  @Input() activityAmountCashback: ActivityAmountCashBack[] = [];

  getTotalAmount(): number {
    return this.activityAmountCashback
      .map(a => a.cashBackAmount.amount)
      .reduce((a, b) => a + b, 0);
  }
  getPercentByMCC(category: ActivityAmountCashBack): number {
    if (category.cashBackAmount.amount > 0) {
      return (category.cashBackAmount.amount * 100) / this.getTotalAmount();
    } else {
      return 0;
    }
  }
}
