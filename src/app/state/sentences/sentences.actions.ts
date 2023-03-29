import { createAction, props } from '@ngrx/store';
import { ProblemDetails, SentenceDto, WordDto, WordTypeEnum } from 'sentencebuilder-api-client-sdk-typescriptangular';

export const SENTENCES_REQUEST = '[Sentences] Get sentences request';
export const SENTENCES_SUCCESS = '[Sentences] Get sentences done';
export const SENTENCES_ERROR = '[Sentences] Get sentences error';
export const SENTENCES_RESET = '[Sentences] sentences reset state';

export const getSentencesRequest = createAction(SENTENCES_REQUEST);
export const getSentencesSuccess = createAction(SENTENCES_SUCCESS, props<{ sentences: SentenceDto[] }>());
export const getSentencesError = createAction(SENTENCES_ERROR, props<{ error: ProblemDetails }>());
export const sentencesReset = createAction(SENTENCES_RESET);