import { createAction, props } from '@ngrx/store';
import { SummaryResponse } from '../../shared/intefaces/apis/summary-response';

export const setSummaryByPeriod = createAction(
  '[Summary] Set Summary By Period',
  props<{ summary: SummaryResponse }>()
);
