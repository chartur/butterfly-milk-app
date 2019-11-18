import { Injectable } from '@angular/core';
import AppParams from '../params';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  params = AppParams;

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get(this.params.makeUrl(this.params.urls.chooseStudent));
  }
}
