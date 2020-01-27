import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import AppParams from '../params';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  params = AppParams;
  constructor(private http: HttpClient) { }

  getWordsBySearch(data: any) {
    data.studentId = this.params.getDataFromStorage('student');
    return this.http.get(this.params.makeUrl(this.params.urls.dictionary.getDictionaryWords, data));
  }

  getWordDetails(wordId: number) {
      const studentId = this.params.getDataFromStorage('student');
      return this.http.get(this.params.makeUrl(this.params.urls.dictionary.getWordDetails, {wordId, studentId}));
  }

  makeWordAsViewed(wordId: number) {
    const studentId = this.params.getDataFromStorage('student');
    return this.http.post(this.params.makeUrl(this.params.urls.dictionary.makeWordAsViewed, {wordId, studentId}), true);
  }

  getStudentMonthOfDictionaryByYear(year: number) {
    const studentId = this.params.getDataFromStorage('student');
    return this.http.get(this.params.makeUrl(this.params.urls.dictionary.getStudentMonthOfDictionaryByYear, {year, studentId}));
  }
}
