import { createReducer, on } from '@ngrx/store';
import { ProblemDetails, SentenceDto } from 'sentencebuilder-api-client-sdk-typescriptangular';
import * as sentencesActions from './sentences.actions';

export interface SentencesState {
  sentences: SentenceDto[];
  error: ProblemDetails;
}

const initialState: SentencesState = {
  sentences: [],
  error: {}
};

export const sentencesReducer = createReducer(
  initialState,
  on(sentencesActions.getSentencesRequest, (state) => state),
  on(sentencesActions.getSentencesSuccess, (state, {sentences}) => ({ sentences: sentences, error: {} })),
  on(sentencesActions.getSentencesError, (state, {error}) => ({ sentences: [], error: error })),
  on(sentencesActions.sentencesReset, (state) => initialState)
);