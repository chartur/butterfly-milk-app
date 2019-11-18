import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HandleService} from './handle.service';
import AppParams from '../params';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  params = AppParams;

  loggedEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
      private handleService: HandleService,
      private http: HttpClient,
      private router: Router,
  ) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  refreshToken() {
    return this.http.post(this.params.makeUrl(this.params.urls.refreshToken), false);
  }

  loginRequest(data) {
    return this.http.post(this.params.makeUrl(this.params.urls.postLogin), data);
  }

  storeUser(data) {
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('student', data.students[0].id);
    this.loggToogle();
  }

  storItem(item, value) {
    localStorage.setItem(item, value);
  }

  logOut() {
      localStorage.clear();
      this.loggToogle();
      this.router.navigate(['/login']);
  }

  loggToogle() {
    return this.loggedEvent.emit(this.isLoggedIn());
  }
}
