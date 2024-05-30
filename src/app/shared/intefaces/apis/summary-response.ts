import { ActivityAmountCashBack } from '../activity-amount-cashback';
import { CashBackAmounts } from '../cashback-amounts';
import { Customer } from '../customer';
import { Errors } from '../Errors';

export interface SummaryResponse {
  errors?: Errors[];
  customer: Customer;
  cardTransaction: CashBackAmounts;
  cashbackCategory: ActivityAmountCashBack[];
}
