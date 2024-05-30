import { createAction, props } from '@ngrx/store';
import { Promotion } from '../../shared/intefaces/promotion';

export const setPromotions = createAction(
  '[Promotions] Set Promotions',
  props<{ promotions: Promotion[] }>()
);
