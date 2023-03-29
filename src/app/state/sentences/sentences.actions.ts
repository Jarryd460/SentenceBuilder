import { createAction, props } from '@ngrx/store';
import { CreateSentenceDto, ProblemDetails, SentenceDto, WordDto, WordTypeEnum } from 'sentencebuilder-api-client-sdk-typescriptangular';

export const SENTENCES_REQUEST = '[Sentences] Get sentences request';
export const SENTENCES_SUCCESS = '[Sentences] Get sentences done';
export const SENTENCES_ERROR = '[Sentences] Get sentences error';
export const SENTENCES_RESET = '[Sentences] sentences reset state';

export const getSentencesRequest = createAction(SENTENCES_REQUEST);
export const getSentencesSuccess = createAction(SENTENCES_SUCCESS, props<{ sentences: SentenceDto[] }>());
export const getSentencesError = createAction(SENTENCES_ERROR, props<{ error: ProblemDetails }>());
export const sentencesReset = createAction(SENTENCES_RESET);

export const SENTENCES_CREATE_REQUEST = '[Sentences] create sentence request';
export const SENTENCES_CREATE_SUCCESS = '[Sentences] create sentence done';
export const SENTENCES_CREATE_ERROR = '[Sentences] create sentence error';

export const createSentenceRequest = createAction(SENTENCES_CREATE_REQUEST, props<{ sentence: CreateSentenceDto }>());
export const createSentenceSuccess = createAction(SENTENCES_CREATE_SUCCESS, props<{ sentence: SentenceDto }>());
export const createSentenceError = createAction(SENTENCES_CREATE_ERROR, props<{ error: ProblemDetails }>());