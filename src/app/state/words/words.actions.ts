import { createAction, props } from '@ngrx/store';
import { ProblemDetails, WordDto, WordTypeEnum } from 'sentencebuilder-api-client-sdk-typescriptangular';

export const WORDS_REQUEST = '[Words] Get words request';
export const WORDS_SUCCESS = '[Words] Get words done';
export const WORDS_ERROR = '[Words] Get words error';
export const WORDS_RESET = '[Words] words reset state';

export const getWordsRequest = createAction(WORDS_REQUEST, props<{ wordTypeId: WordTypeEnum }>);
export const getWordsSuccess = createAction(WORDS_SUCCESS, props<{ words: WordDto[] }>());
export const getWordsError = createAction(WORDS_ERROR, props<{ error: ProblemDetails }>());
export const wordsReset = createAction(WORDS_RESET);