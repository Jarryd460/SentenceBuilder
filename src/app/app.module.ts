import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { wordTypesReducer } from './state/word-types/word-types.reducers';
import { ApiModule } from 'sentencebuilder-api-client-sdk-typescriptangular';
import { HttpClientModule } from '@angular/common/http';
import { BASE_PATH } from 'sentencebuilder-api-client-sdk-typescriptangular';
import { EffectsModule } from '@ngrx/effects';
import { WordTypesEffects } from './state/word-types/word-types.effects';
import { WordsEffects } from './state/words/words.effects';
import { wordsReducer } from './state/words/words.reducers';
import { sentencesReducer } from './state/sentences/sentences.reducers';
import { SentencesEffects } from './state/sentences/sentences.effects';

import { environment } from '../environments/environment';
import { SentenceComponent } from './sentence/sentence.component';
import { appReducer } from './state/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    SentenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    HttpClientModule,
    StoreModule.forRoot(
      { 
        wordTypes: wordTypesReducer ,
        words: wordsReducer,
        sentences: sentencesReducer,
        appState: appReducer
      }
    ),
    EffectsModule.forRoot([
      WordTypesEffects,
      WordsEffects,
      SentencesEffects
    ])
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.apiRoot } 
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
