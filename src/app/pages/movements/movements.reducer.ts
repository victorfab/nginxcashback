import { Action, createReducer, on } from '@ngrx/store';
import { Purchase } from '../../shared/intefaces/purchase';
import {
  getMoreMovements,
  loadMovements,
  resetMovements
} from './movements.actions';
import { PaginationMetadata } from '../../shared/intefaces/pagination-metadata';

export interface PurchasesAppState {
  purchases: Purchase[];
  paginationMetadata: PaginationMetadata;
}

const _initialState: PurchasesAppState = {
  purchases: [],
  paginationMetadata: {
    pageNumber: 0,
    totalPages: 0,
    pageSize: 10,
    count: 0,
    totalRecords: 0
  }
};

const _purchasesReducer = createReducer(
  _initialState,
  on(loadMovements, (state = _initialState, { purchases }) => ({
    ...state,
    ...purchases
  })),
  on(getMoreMovements, (state, { purchases, paginationMetadata }) => ({
    ...state,
    purchases: [...state.purchases, ...purchases],
    paginationMetadata: { ...state.paginationMetadata, ...paginationMetadata }
  })),
  on(resetMovements, () => _initialState)
);

export function purchasesReducer(
  state: PurchasesAppState | undefined,
  action: Action
) {
  return _purchasesReducer(state, action);
}
