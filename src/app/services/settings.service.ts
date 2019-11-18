import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import AppParams from '../params';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  appParams = AppParams
  constructor(private http: HttpClient) { }

  updatePassword(data: any) {
    return this.http.post(this.appParams.makeUrl(this.appParams.urls.settings.updatePassword), data);
  }
}
