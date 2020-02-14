import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import AppParams from '../params';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  appParams = AppParams;

  constructor(
      private http: HttpClient
  ) { }

  getFundamentals() {
    const studentId = this.appParams.getDataFromStorage('student');
    return this.http.get(this.appParams.makeUrl(this.appParams.urls.quiz.getFundamentalQuizzes, {studentId}));
  }

  getTopQuizzes() {
    const studentId = this.appParams.getDataFromStorage('student');
    return this.http.get(this.appParams.makeUrl(this.appParams.urls.quiz.getTopQuizzes, {studentId}));
  }

  getQuizDataById(quizId: string) {
    const studentId = this.appParams.getDataFromStorage('student');
    return this.http.get(this.appParams.makeUrl(this.appParams.urls.quiz.getQuizDataById.replace(':quizId', quizId), {studentId}));
  }

  getQuizStartData(quizId: string) {
    const studentId = this.appParams.getDataFromStorage('student');
    return this.http.get(this.appParams.makeUrl(this.appParams.urls.quiz.getQuizStartData.replace(':quizId', quizId), {studentId}));
  }

  getQuizEndData(quizId: string) {
    const studentId = this.appParams.getDataFromStorage('student');
    return this.http.get(this.appParams.makeUrl(this.appParams.urls.quiz.getQuizEndData.replace(':quizId', quizId), {studentId}));
  }

  submitQuiz(quizId: string, data: any) {
    const studentId = this.appParams.getDataFromStorage('student');
    return this.http.post(this.appParams.makeUrl(this.appParams.urls.quiz.submitQuiz.replace(':quizId', quizId), {studentId}), data);
  }

  getMonsterExplosionImage() {
    return this.http.get(this.appParams.makeUrl(this.appParams.urls.quiz.getMonsterExplosionImage));
  }
}
