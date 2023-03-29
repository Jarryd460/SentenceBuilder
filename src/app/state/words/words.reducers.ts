import { createReducer, on } from '@ngrx/store';
import { ProblemDetails, WordDto } from 'sentencebuilder-api-client-sdk-typescriptangular';
import * as wordsActions from './words.actions';

export interface WordsState {
  words: WordDto[];
  error: ProblemDetails;
}

const initialState: WordsState = {
  words: [],
  error: {}
};

export const wordsReducer = createReducer(
  initialState,
  on(wordsActions.getWordsRequest, (state) => state),
  on(wordsActions.getWordsSuccess, (state, {words}) => ({ words: words, error: {} })),
  on(wordsActions.getWordsError, (state, {error}) => ({ words: [], error: error })),
  on(wordsActions.wordsReset, (state) => initialState)
);