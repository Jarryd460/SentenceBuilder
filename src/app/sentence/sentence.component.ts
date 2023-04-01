import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SentenceDto, SentenceWordDto } from 'sentencebuilder-api-client-sdk-typescriptangular';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html'
})
export class SentenceComponent {
  @Input() sentence: SentenceDto | undefined;
  @Output() deleteSentence$ = new EventEmitter<number>();

  getSentence(): string {
    let concatenatedSentenceWords: string = '';    

    if (this.sentence?.sentencesWords && this.sentence.sentencesWords.length > 0) {
      let wordsInSortedOrder: SentenceWordDto[] = [];
      this.sentence.sentencesWords.forEach(word => wordsInSortedOrder.push(Object.assign({}, word)));
      wordsInSortedOrder.sort((wordA, wordB) => wordA.order - wordB.order);

      for (let index = 0; index < wordsInSortedOrder.length; index++) {
        concatenatedSentenceWords += wordsInSortedOrder[index].word + ' ';
      }

      concatenatedSentenceWords = concatenatedSentenceWords.substring(0, concatenatedSentenceWords.length - 1) + '.';
    }

    return concatenatedSentenceWords;
  }

  deleteSentence(): void {
    this.deleteSentence$.emit(this.sentence?.id);
  }
}
