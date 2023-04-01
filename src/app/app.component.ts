import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CreateSentenceDto, ProblemDetails, WordDto, WordTypeEnum } from 'sentencebuilder-api-client-sdk-typescriptangular';
import { ApiStatus, AppState } from './state/app.states';
import { createSentenceRequest,  deleteSentenceRequest, getSentencesRequest } from './state/sentences/sentences.actions';
import { getSentences, getSentencesError } from './state/sentences/sentences.selectors';
import { getWordTypesRequest } from './state/word-types/word-types.actions';
import { getWordTypes, getWordTypesError } from './state/word-types/word-types.selectors';
import { getWordsRequest } from './state/words/words.actions';
import { getWords, getWordsError } from './state/words/words.selectors';
import { CurrentSentence } from './sentence/current-sentence';
import { selectAppState } from './state/app.selector';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'SentenceBuilder';
  apiStatus$ = this.store.select(selectAppState);
  wordTypes$ = this.store.select(getWordTypes);
  wordTypesError$ = this.store.select(getWordTypesError);
  words$ = this.store.select(getWords);
  wordsError$ = this.store.select(getWordsError);
  sentences$ = this.store.select(getSentences);
  sentencesError$ = this.store.select(getSentencesError);
  currentSentence: CurrentSentence[];
  currentSentenceAsString: string;
  sentence: CreateSentenceDto;
  errors: ProblemDetails[];
  apiMessage: string;
 
  constructor(
    private store: Store<AppState>
    ) {
      this.currentSentence = [];
      this.currentSentenceAsString = '';
      this.sentence = {
      };
      this.errors = [];
      this.apiMessage = '';
  }
 
  ngOnInit(): void {
    this.store.dispatch(getWordTypesRequest());
    this.store.dispatch(getWordsRequest({ wordTypeId: this.convertNumberToWordTypeEnum(this.defaultWordType()) }));
    this.store.dispatch(getSentencesRequest());

    this.addLoadDataErrorHandlers();
    
    this.apiStatus$.subscribe((appState) => {
      if (appState && appState.apiStatus !== ApiStatus.Unknown) {
        if (appState.apiStatus === ApiStatus.Success) {
          this.apiMessage = appState.apiResponseMessage;
          this.resetCurrentSentence();
          
          setTimeout(() => {
            this.apiMessage = '';
          }, 3000);
        } else {
          this.errors.push({ detail: appState.apiResponseMessage });
        }
      }
    });
  }

  addLoadDataErrorHandlers() {
    this.wordTypesError$.subscribe((error) => {
      if (Object.keys(error).length > 0) {
        if (error.detail) {
          this.errors.push(error)
        } else {
          this.errors.push({ detail: 'Something unexpected went wrong loading word types' })
        }  
      }
    });

    this.wordsError$.subscribe((error) => {
      if (Object.keys(error).length > 0) {
        if (error.detail) {
          this.errors.push(error)
        } else {
          this.errors.push({ detail: 'Something unexpected went wrong loading words' })
        }
      }
    });

    this.sentencesError$.subscribe((error) => {
      if (Object.keys(error).length > 0) {
        if (error.detail) {
          this.errors.push(error)
        } else {
          this.errors.push({ detail: 'Something unexpected went wrong loading sentences' })
        }
      }
    });
  }

  resetCurrentSentence() {
    this.currentSentence = [];
    this.currentSentenceAsString = '';
  }

  defaultWordType(): number {
    return WordTypeEnum.NUMBER_6;
  }

  onWordTypeSelected(wordTypeId: string): void {
    this.store.dispatch(getWordsRequest({ wordTypeId: this.convertNumberToWordTypeEnum(Number(wordTypeId)) }));
  }

  convertNumberToWordTypeEnum(wordTypeId: number): WordTypeEnum {
    let wordType: WordTypeEnum;

    switch (wordTypeId) {
      case 1:
        wordType = WordTypeEnum.NUMBER_1;
        break;
      case 2:
        wordType = WordTypeEnum.NUMBER_2;
        break;
      case 3:
        wordType = WordTypeEnum.NUMBER_3;
        break;
      case 4:
        wordType = WordTypeEnum.NUMBER_4;
        break;
      case 5:
        wordType = WordTypeEnum.NUMBER_5;
        break;
      case 6:
        wordType = WordTypeEnum.NUMBER_6;
        break;
      case 7:
        wordType = WordTypeEnum.NUMBER_7;
        break;
      case 8:
        wordType = WordTypeEnum.NUMBER_8;
        break;
      case 9:
        wordType = WordTypeEnum.NUMBER_9;
        break;
      default:
        throw new Error(`Word type {wordTypeId} not support`);                      
    }

    return wordType;
  }

  addWordToSentence(wordId: string): boolean {
    if (!this.sentence.sentenceWords) {
      this.sentence.sentenceWords = [];
    }

    let wordIdInteger: number = Number(wordId);

    this.sentence.sentenceWords.push({
      order: this.sentence.sentenceWords.length + 1,
      wordId: wordIdInteger
    });

    this.words$.subscribe((words) => {
      let wordsCopy: WordDto[] = [];
      words.forEach(word => wordsCopy.push(Object.assign({}, word)));

      let index = wordsCopy.findIndex(word => {
        return word.id == wordIdInteger
      });

      let word = wordsCopy[index];

      this.currentSentence.push({ order: 1, value: word.value }); 

      this.currentSentenceAsString = '';

      for (let index = 0; index < this.currentSentence.length; index++) {
        this.currentSentenceAsString += this.currentSentence[index].value + ' '; 
      }
    });

    return false;
  }

  removeLastWordFromSentence(): boolean {
    if (this.sentence.sentenceWords && this.sentence.sentenceWords.length > 0) {
      this.sentence.sentenceWords.splice(this.sentence.sentenceWords.length - 1, 1);
      this.currentSentence.pop();
      
      this.currentSentenceAsString = '';

      for (let index = 0; index < this.currentSentence.length; index++) {
        this.currentSentenceAsString += this.currentSentence[index].value + ' '; 
      }
    }

    return false;
  }

  removeWordFromSentence(order: string): boolean {
    let index = this.sentence.sentenceWords?.findIndex((word) => {
      return word.order === Number(order);
    });

    if (index && index !== -1) {
      this.sentence.sentenceWords?.splice(index, 1);
      this.currentSentence.splice(0, 1);
    }

    return false;
  }

  addSentence(): boolean {
    this.store.dispatch(createSentenceRequest({ sentence: this.sentence }));
    return false;
  }

  deleteSentence(sentenceId: number): boolean {
    this.store.dispatch(deleteSentenceRequest({ sentenceId: Number(sentenceId) }));
    return false;
  }

  dismissErrorMessages(): void {
    $('.message.negative .close').closest('.message').hide();
    this.errors = [];
  }

  dismissInformationMessages(): void {
    $('.message.positive .close').closest('.message').hide();
  }
}
