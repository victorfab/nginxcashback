import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared/intefaces/product';

export const loadDefaultProducts = createAction(
  '[Cashback] Set Products',
  props<{ products: Product[]; currentProduct: Product }>()
);
export const setCurrentProduct = createAction(
  '[Cashback] Set Current Product',
  props<{ currentProduct: Product }>()
);

export const closeToast = createAction('[Cashback] Close Toast');
