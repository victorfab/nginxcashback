import { createAction, props } from '@ngrx/store';
import { Purchase } from '../../shared/intefaces/purchase';
import { PaginationMetadata } from '../../shared/intefaces/pagination-metadata';

export const loadMovements = createAction(
  '[Movements] Load Movements',
  props<{ purchases: Purchase[] }>()
);

export const getMoreMovements = createAction(
  '[Movements] Get More Movements',
  props<{ purchases: Purchase[]; paginationMetadata: PaginationMetadata }>()
);

export const resetMovements = createAction('[Movements] Reset Movements');
