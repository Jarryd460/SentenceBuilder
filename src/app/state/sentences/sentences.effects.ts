import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProblemDetails, SentencesService } from 'sentencebuilder-api-client-sdk-typescriptangular';
import * as sentencesActions from './sentences.actions';
 
@Injectable()
export class SentencesEffects { 
  loadSentences$ = createEffect(() => this.actions$.pipe(
    ofType(sentencesActions.getSentencesRequest),
    switchMap(() => this.sentencesService.getSentences()
      .pipe(
        map(sentences =>  sentencesActions.getSentencesSuccess({ sentences: sentences })),
        catchError((error: ProblemDetails) => of(sentencesActions.getSentencesError({ error: error })))
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private sentencesService: SentencesService
  ) {}
}