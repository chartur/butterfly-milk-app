import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import AppParams from '../params';

@Injectable({
  providedIn: 'root'
})
export class FundamentalsService {
  params = AppParams;

  constructor(private http: HttpClient) { }

  getFundamentalsIndexPage() {
    return this.http.get(this.params.makeUrl(this.params.urls.fundamentals.index));
  }

  getCombinationWords(lastItemId: number, staticCount: number) {
    return this.http.get(this.params.makeUrl(this.params.urls.fundamentals.getCombinations, {last: lastItemId, count: staticCount}));
  }

  getAbcWordsByLetter(letter: string) {
    return this.http.get(this.params.makeUrl(this.params.urls.fundamentals.getAbcWordsByLetter, {letter}));
  }

  getCombinationWordsById(id: number) {
    return this.http.get(this.params.makeUrl(this.params.urls.fundamentals.getCombinationWordsById, {id}));
  }

  getSyllablesByCount(count: number) {
    return this.http.get(this.params.makeUrl(this.params.urls.fundamentals.getSyllablesByCount, {count}));
  }

  getSightWordsBooks(lastItemId: number, staticCount: number) {
    return this.http.get(this.params.makeUrl(this.params.urls.fundamentals.getSightWordsBooks, {last: lastItemId, count: staticCount}));
  }

  getWordsOfBookById(bookId: number) {
    return this.http.get(this.params.makeUrl(this.params.urls.fundamentals.getWordsOfBookById, {bookId}));
  }
}
