import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProblemDetails, WordTypesService } from 'sentencebuilder-api-client-sdk-typescriptangular';
import * as wordTypesActions from './word-types.actions';
 
@Injectable()
export class WordTypesEffects { 
  loadWordTypes$ = createEffect(() => this.actions$.pipe(
    ofType(wordTypesActions.getWordTypesRequest),
    switchMap(() => this.wordTypesService.getWordTypes()
      .pipe(
        map(wordTypes =>  wordTypesActions.getWordTypesSuccess({ wordTypes: wordTypes })),
        catchError((error: ProblemDetails) => of(wordTypesActions.getWordTypesError({ error: error })))
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private wordTypesService: WordTypesService
  ) {}
}