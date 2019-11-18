import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import AppParams from '../params';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  appParams = AppParams;
  constructor(private http: HttpClient) { }

  getStudentBooks() {
    const studentId = this.appParams.getDataFromStorage('student');
    return this.http.get(this.appParams.makeUrl(this.appParams.urls.books.getStudentBooks, {studentId}));
  }
}
