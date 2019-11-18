import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {HandleService} from '../../services/handle.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingPreference} from '../../preferences/LoadingPreference';
import {RouterPage} from '../../helpers/RouterPage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends RouterPage implements OnInit, OnDestroy {

  password: string;
  username: string;
  passwordType: boolean = true;

  constructor(
      private loadingPref: LoadingPreference,
      private authService: AuthService,
      private handler: HandleService,
      private router: Router,
      private route: ActivatedRoute
  ) {
    super(router, route);
  }

  ngOnInit() {
  }

  onEnter() {}

  async login() {
    const loading = await this.loadingPref.make();

    loading.present();

    const data = {username: this.username, password: this.password};
    try {
        const request: any = await this.handler.run(this.authService.loginRequest(data));
        this.authService.storeUser(request.data);
        this.router.navigateByUrl('/home');
        this.username = '';
        this.password = '';
    } catch (e) {
        this.handler.presentAlert(e.error.message, e);
    }

    loading.dismiss();
  }

  onDestroy() {
    super.ngOnDestroy();
  }
}
