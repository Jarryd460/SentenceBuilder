import { createReducer, on } from '@ngrx/store';
import { ProblemDetails, WordTypeDto } from 'sentencebuilder-api-client-sdk-typescriptangular';
import * as wordTypesActions from './word-types.actions';

export interface WordTypesState {
  wordTypes: WordTypeDto[];
  error: ProblemDetails;
}

const initialState: WordTypesState = {
  wordTypes: [],
  error: {}
};

export const wordTypesReducer = createReducer(
  initialState,
  on(wordTypesActions.getWordTypesRequest, (state) => state),
  on(wordTypesActions.getWordTypesSuccess, (state, {wordTypes}) => ({ wordTypes: wordTypes, error: {} })),
  on(wordTypesActions.getWordTypesError, (state, {error}) => ({ wordTypes: [], error: error })),
  on(wordTypesActions.wordTypesReset, (state) => initialState)
);