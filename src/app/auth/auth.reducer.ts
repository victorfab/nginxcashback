import { Action, createReducer, on } from '@ngrx/store';
import { setBuc } from './auth.actions';

export interface AuthAppState {
  buc: string | null;
  token: string | null;
}

export const initialState: AuthAppState = {
  buc: null,
  token: null
};

const _authReducer = createReducer(
  initialState,
  on(setBuc, (state, { buc, token }) => ({ ...state, buc, token }))
);

export function authReducer(state: AuthAppState, action: Action) {
  return _authReducer(state, action);
}
