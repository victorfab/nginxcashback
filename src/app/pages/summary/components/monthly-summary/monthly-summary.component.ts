import { Component, Input } from '@angular/core';
import {
  EmptyState,
  EmptyStateImage
} from '../../../../shared/intefaces/empty-state';
import { CashBackAmounts } from '../../../../shared/intefaces/cashback-amounts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-monthly-summary',
  templateUrl: './monthly-summary.component.html',
  styleUrls: ['./monthly-summary.component.scss']
})
export class MonthlySummaryComponent {
  @Input() cashbackAmounts: CashBackAmounts | undefined;
  errorSummary: EmptyState = {
    title: 'Ocurrió un error',
    message:
      'Por el momento no podemos mostrar el Cashback que acumulaste. Por favor, inténtalo más tarde.',
    image: EmptyStateImage.document
  };

  getMonth() {
    let date;
    if (this.cashbackAmounts?.cashbackPeriod) {
      date = new Date().setMonth(
        parseInt(this.cashbackAmounts.cashbackPeriod.month) - 1
      );
    } else {
      date = new Date();
    }
    return format(date, 'MMMM', { locale: es });
  }
}
