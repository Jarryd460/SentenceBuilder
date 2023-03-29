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

@NgModule({
  declarations: [
    AppComponent
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
        sentences: sentencesReducer
      }
    ),
    EffectsModule.forRoot([
      WordTypesEffects,
      WordsEffects,
      SentencesEffects
    ])
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
