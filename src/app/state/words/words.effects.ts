import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProblemDetails, WordsService } from 'sentencebuilder-api-client-sdk-typescriptangular';
import * as wordsActions from './words.actions';
 
@Injectable()
export class WordsEffects { 
  loadWords$ = createEffect(() => this.actions$.pipe(
    ofType(wordsActions.getWordsRequest),
    switchMap(({_p}) => this.wordsService.getWords(_p.wordTypeId)
      .pipe(
        map(words =>  wordsActions.getWordsSuccess({ words: words })),
        catchError((error: ProblemDetails) => of(wordsActions.getWordsError({ error: error })))
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private wordsService: WordsService
  ) {}
}