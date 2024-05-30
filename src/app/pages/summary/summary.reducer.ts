import { Action, createReducer, on } from '@ngrx/store';
import { SummaryResponse } from '../../shared/intefaces/apis/summary-response';
import { setSummaryByPeriod } from './summary.actions';
import { Product } from '../../shared/intefaces/product';

export interface SummaryAppState {
  currentProduct: Product | undefined;
  summary: SummaryResponse | undefined;
}

const _initialState: SummaryAppState = {
  currentProduct: undefined,
  summary: undefined
};

const _summaryReducer = createReducer(
  _initialState,
  on(setSummaryByPeriod, (state, { summary }) => ({ ...state, summary }))
);

export function summaryReducer(state: SummaryAppState, action: Action) {
  return _summaryReducer(state, action);
}
