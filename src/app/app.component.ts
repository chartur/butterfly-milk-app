import { Component } from '@angular/core';

import {AlertController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';
import {HandleService} from './services/handle.service';
import { MenuController } from '@ionic/angular';
import {StudentService} from './services/student.service';
import AppParams from './params';
import {Router} from '@angular/router';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [];
  students: any[] = [];
  loggedIn: boolean;
  appParams = AppParams;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private studentService: StudentService,
    private handlerService: HandleService,
    public alertController: AlertController,
    public menuCtrl: MenuController,
    private navCtrl: NavController,
    private router: Router,
    private photoViewer: PhotoViewer,
    private handler: HandleService,
  ) {
    this.initializeApp();
    this.makeSideBar();
    this.authService.loggedEvent.subscribe((res) => this.makeSideBar());
    this.handlerService.loggedEvent.subscribe((res) => this.makeSideBar());
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.menuCtrl.get().then((menu: HTMLIonMenuElement) => {
        menu.swipeGesture = false;
      });
      const request: any = await this.handlerService.run(this.studentService.getStudents());
      this.students = request.data.students;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



  chooseStudent(student: any) {
    const currentStudent = this.appParams.getDataFromStorage('student');
    if (currentStudent == student.id) {
      const image = !!student.main_image ? this.appParams.makeStaticUrl(student.main_image.path) : this.appParams.avatar();
      return this.photoViewer.show(image, student.name + ' ' + student.surname);
    }

    this.authService.storItem('student', student.id);
    this.navCtrl.navigateRoot(this.router.url);
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
