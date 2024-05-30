import { Component, Input } from '@angular/core';
import { ActivityAmountCashBack } from '../../../../shared/intefaces/activity-amount-cashback';

@Component({
  selector: 'app-summary-by-mcc',
  templateUrl: './summary-by-mcc.component.html',
  styleUrls: ['./summary-by-mcc.component.scss']
})
export class SummaryByMccComponent {
  @Input() activityAmountCashBacks: ActivityAmountCashBack[] = [];

  getPercent(id: string) {
    const percent = this.activityAmountCashBacks.find(
      cat => cat.categoryCode == id
    )?.cashBackPercentage;
    return percent ? `+${percent}%` : '';
  }
}
