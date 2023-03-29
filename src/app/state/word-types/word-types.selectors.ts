import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WordTypesState } from "./word-types.reducers";

const getWordTypesState = createFeatureSelector<WordTypesState>('wordTypes');

export const getWordTypes = createSelector(
    getWordTypesState,
    state => state.wordTypes
);
  
export const getWordTypesError = createSelector(
    getWordTypesState,
    state => state.error
);