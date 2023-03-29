import { createAction, props } from '@ngrx/store';
import { ProblemDetails, WordTypeDto } from 'sentencebuilder-api-client-sdk-typescriptangular';

export const WORD_TYPES_REQUEST = '[WordTypes] Get word types request';
export const WORD_TYPES_SUCCESS = '[WordTypes] Get word types done';
export const WORD_TYPES_ERROR = '[WordTypes] Get word types error';
export const WORD_TYPES_RESET = '[WordTypes] word types reset state';

export const getWordTypesRequest = createAction(WORD_TYPES_REQUEST);
export const getWordTypesSuccess = createAction(WORD_TYPES_SUCCESS, props<{ wordTypes: WordTypeDto[] }>());
export const getWordTypesError = createAction(WORD_TYPES_ERROR, props<{ error: ProblemDetails }>());
export const wordTypesReset = createAction(WORD_TYPES_RESET);