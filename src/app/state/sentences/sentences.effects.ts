import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProblemDetails, SentencesService } from 'sentencebuilder-api-client-sdk-typescriptangular';
import * as sentencesActions from './sentences.actions';
import { Store } from '@ngrx/store';
import { ApiStatus, AppState } from '../app.states';
import { setApiActionStatus } from '../app.action';
 
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

  createSentence$ = createEffect(() => this.actions$.pipe(
    ofType(sentencesActions.createSentenceRequest),
    switchMap((parameters) => this.sentencesService.postSentence(parameters.sentence)
      .pipe(
        map((sentence) => {
          this.appStore.dispatch(
            setApiActionStatus({
              apiStatus: { apiResponseMessage: 'Successfully created sentence', apiStatus: ApiStatus.Success, error: null },
            })
          );
          return sentencesActions.createSentenceSuccess({ sentence: sentence })
      }),
        catchError((error: ProblemDetails) => {
          this.appStore.dispatch(
            setApiActionStatus({
              apiStatus: { apiResponseMessage: 'Failed to create sentence', apiStatus: ApiStatus.Success, error: null },
            })
          );
          return of(sentencesActions.createSentenceError({ error: error }))
        })
      ))
    )
  );

  deleteSentence$ = createEffect(() => this.actions$.pipe(
    ofType(sentencesActions.deleteSentenceRequest),
    switchMap((parameters) => this.sentencesService.deleteSentence(parameters.sentenceId)
      .pipe(
        map(() => {
          this.appStore.dispatch(
            setApiActionStatus({
              apiStatus: { apiResponseMessage: 'Successfully deleted sentence', apiStatus: ApiStatus.Success, error: null },
            })
          );

          return sentencesActions.deleteSentenceSuccess({ sentenceId: parameters.sentenceId })
        }),
        catchError((error: ProblemDetails) => {
          this.appStore.dispatch(
            setApiActionStatus({
              apiStatus: { apiResponseMessage: 'Failed to delete sentence', apiStatus: ApiStatus.Success, error: null },
            })
          );

          return of(sentencesActions.deleteSentenceError({ error: error }))
        })
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private sentencesService: SentencesService,
    private appStore: Store<AppState>
  ) {}
}