import { Action, createReducer, on } from '@ngrx/store';
import { setFilters } from './filters.actions';

export interface FiltersAppState {
  period: string;
  mcc: string;
}

export const _initialState: FiltersAppState = {
  period: 'current',
  mcc: ''
};

export const _reducer = createReducer(
  _initialState,
  on(setFilters, (state, { period, mcc }) => ({ ...state, period, mcc }))
);

export function filtersReducer(
  state: FiltersAppState | undefined,
  action: Action
) {
  return _reducer(state, action);
}
