import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import AppParams from '../params';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  params = AppParams;
  constructor(private http: HttpClient) { }

  getStudentImage() {
    const studentId = this.params.getDataFromStorage('student');
    return this.http.get(this.params.makeUrl(this.params.urls.subscription.getImages, {student: studentId}));
  }

  getStudentNotificationSettings() {
    const studentId = this.params.getDataFromStorage('student');
    return this.http.get(this.params.makeUrl(this.params.urls.subscription.getNotificationSettings, {student: studentId}));
  }

  updateStudentNotificationSettings(notification) {
    const studentId = this.params.getDataFromStorage('student');
    notification.student = studentId;
    return this.http.post(this.params.makeUrl(this.params.urls.subscription.updateNotificationSettings), notification);
  }
}
