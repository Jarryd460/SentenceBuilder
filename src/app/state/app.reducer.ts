import { createReducer, on } from '@ngrx/store';
import { setApiActionStatus } from './app.action';
import { ApiStatus, AppState } from './app.states';

export const initialState: Readonly<AppState> = {
  apiStatus: ApiStatus.Unknown,
  apiResponseMessage: '',
  error: null
};

export const appReducer = createReducer(
  initialState,
  on(setApiActionStatus, (state, { apiStatus }) => {
    return {
      ...state,
      ...apiStatus
    };
  })
);
