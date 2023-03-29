import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WordsState } from "./words.reducers";

const getWordsState = createFeatureSelector<WordsState>('words');

export const getWords = createSelector(
    getWordsState,
    state => state.words
);
  
export const getWordsError = createSelector(
    getWordsState,
    state => state.error
);