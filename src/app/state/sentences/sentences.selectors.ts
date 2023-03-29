import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SentencesState } from "./sentences.reducers";

const getSentencesState = createFeatureSelector<SentencesState>('sentences');

export const getSentences = createSelector(
    getSentencesState,
    state => state.sentences
);
  
export const getSentencesError = createSelector(
    getSentencesState,
    state => state.error
);