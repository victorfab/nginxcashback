import { createAction, props } from '@ngrx/store';

export const setBuc = createAction(
  '[Auth] Set Buc',
  props<{ buc: string; token: string }>()
);
