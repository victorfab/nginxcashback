import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '../../shared/intefaces/product';
import {
  closeToast,
  loadDefaultProducts,
  setCurrentProduct
} from './cashback.actions';

export interface CashbackAppState {
  products: Product[];
  currentProduct: Product | undefined;
  isOpenToast: boolean;
}

export const initialState: CashbackAppState = {
  products: [],
  currentProduct: undefined,
  isOpenToast: true
};

const _cashbackReducer = createReducer(
  initialState,
  on(loadDefaultProducts, (state, { products, currentProduct }) => ({
    ...state,
    products,
    currentProduct
  })),
  on(setCurrentProduct, (state, { currentProduct }) => ({
    ...state,
    currentProduct
  })),
  on(closeToast, state => ({
    ...state,
    isOpenToast: false
  }))
);

export function cashbackReducer(state: CashbackAppState, action: Action) {
  return _cashbackReducer(state, action);
}
