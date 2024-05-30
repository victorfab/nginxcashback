import { Action, createReducer, on } from '@ngrx/store';
import { setPromotions } from './promotions.action';
import { Promotion } from 'src/app/shared/intefaces/promotion';

export interface PromotionsState {
  promotions: Promotion[];
}

const _initialState: PromotionsState = {
  promotions: []
};

const _promotionsReducer = createReducer(
  _initialState,
  on(setPromotions, (state, { promotions }) => ({ ...state, promotions }))
);

export function promotionsReducer(
  state: { promotions: Promotion[] } | undefined,
  action: Action
) {
  return _promotionsReducer(state, action);
}
