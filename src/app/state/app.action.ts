import { createAction, props } from "@ngrx/store";
import { AppState } from "./app.states";

export const SET_API_ACTION_STATUS = '[Api] success or failure status';

export const setApiActionStatus = createAction(
    SET_API_ACTION_STATUS,
    props<{ apiStatus: AppState }>()
);