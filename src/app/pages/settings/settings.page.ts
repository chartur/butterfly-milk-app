import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterPage} from '../../helpers/RouterPage';
import AppParams from '../../params';
import {ActivatedRoute, Router} from '@angular/router';
import {HandleService} from '../../services/handle.service';
import {LoadingPreference} from '../../preferences/LoadingPreference';
import {SettingsService} from '../../services/settings.service';

import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../helpers/Validators/MustMatch';
import {AlertController, MenuController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends RouterPage implements OnInit, OnDestroy {

  appParams = AppParams;
  showPassword = false;
  passwordForm: FormGroup;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private settingsService: SettingsService,
      private handler: HandleService,
      private loadingPref: LoadingPreference,
      public menuCtrl: MenuController,
      public alertController: AlertController,
      private authService: AuthService,
  ) {
    super(router, route);
  }

  onEnter() {
    // this.initSettingsPage();
  }

  ngOnInit() {
  }

  initSettingsPage() {
    this.showPassword = false;
    this.passwordForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {
      validator: MustMatch('password', 'password_confirmation')
    });
  }

  async updatePassword() {
    const loading = await this.loadingPref.make();

    loading.present();

    const data = this.passwordForm.value;
    try {
      const request: any = await this.handler.run(this.settingsService.updatePassword(data));
      this.handler.presentAlert(request.message, {}, 'Success!');
      this.passwordForm.reset();
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }

    loading.dismiss();
  }

  get f() { return this.passwordForm.controls; }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  async logoutConfirmation() {
    this.menuCtrl.close();
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you  sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: () => {
            this.authService.logOut();
          }
        }
      ]
    });

    await alert.present();
  }
}
