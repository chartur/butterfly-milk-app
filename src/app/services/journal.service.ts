import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import AppParams from '../params';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  params = AppParams;
  constructor(
      private http: HttpClient
  ) {}

  getStudentLessonsByStudent() {
    const studentId = this.params.getDataFromStorage('student');
    return this.http.get(this.params.makeUrl(this.params.urls.journal.index, {studentId}));
  }

  getBookDetailsById(bookId: number) {
    return this.http.get(this.params.makeUrl(this.params.urls.journal.getBookDetailsById, {bookId}));
  }

  getWithingByLessonId(lessonId: number) {
    const studentId = this.params.getDataFromStorage('student');
    return this.http.get(this.params.makeUrl(this.params.urls.journal.getWithingByLessonId, {lessonId, studentId}));
  }

  getVocabularyOfLessonByStudentId(lessonId: number) {
    const studentId = this.params.getDataFromStorage('student');
    return this.http.get(this.params.makeUrl(this.params.urls.journal.getVocabularyOfLessonByStudentId, {lessonId, studentId}));
  }
}
