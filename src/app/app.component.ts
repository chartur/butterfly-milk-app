import { Component } from '@angular/core';

import {AlertController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';
import {HandleService} from './services/handle.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [];
  loggedIn: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private handlerService: HandleService,
    public alertController: AlertController,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
    this.makeSideBar();
    this.authService.loggedEvent.subscribe((res) => this.makeSideBar());
    this.handlerService.loggedEvent.subscribe((res) => this.makeSideBar());
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  makeClickOfSideBar(p) {
    if (typeof p.url === 'undefined') {
      p.clickEvent();
    }
  }

  makeSideBar(): void {
    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.appPages = [
        {
          title: 'Journal',
          url: '/home',
          icon: 'clipboard'
        },
        {
          title: 'Subscription',
          url: '/subscription',
          icon: 'ios-people'
        },
        {
          title: 'Books',
          url: '/books',
          icon: 'ios-bookmarks'
        },
        {
          title: 'Dictionary',
          url: '/dictionary',
          icon: 'list-box'
        },
        {
          title: 'Reading Fundamentals',
          url: '/fundamentals',
          icon: 'paper'
        }
      ];
    }
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
