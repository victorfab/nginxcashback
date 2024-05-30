import { createAction, props } from '@ngrx/store';

export const setFilters = createAction(
  '[Filters] Set Filters',
  props<{ period: string; mcc: string }>()
);
