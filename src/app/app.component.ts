import { Component } from '@angular/core';
// import { FCM } from '@ionic-native/fcm/ngx';

import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';
import {HandleService} from './services/handle.service';
import {StudentService} from './services/student.service';
import AppParams from './params';
import {NavigationEnd, Router} from '@angular/router';
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
  isAndroid: boolean;
  studentsScrolling = true;

  navLinksArray: string[] = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private studentService: StudentService,
    private handlerService: HandleService,
    private navCtrl: NavController,
    private router: Router,
    private photoViewer: PhotoViewer,
    // private fcm: FCM,
  ) {
    this.initializeApp();
    this.authService.loggedEvent.subscribe((res) => this.makeSideBar());
    this.handlerService.loggedEvent.subscribe((res) => this.makeSideBar());
  }

  initializeApp() {
    this.isAndroid = this.platform.is('android');
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.makeSideBar();
      // this.initNotification();
    });
    this.registerNavigationChanges();
    this.hardwareBackButton();
  }

  registerNavigationChanges() {
    this.router.events.subscribe(event => {
      const url = this.router.url;
      if (event instanceof NavigationEnd) {
        const isCurrentUrlSaved = this.navLinksArray.find((item) => {
          return (item === url);
        });

        if (!isCurrentUrlSaved) {
          this.navLinksArray.push(url);
        }
      }
    });
  }

  hardwareBackButton() {
    this.platform.backButton.subscribe(() => {
      if (this.navLinksArray.length > 1) {
        this.navLinksArray.pop();
        const index = this.navLinksArray.length - 1;
        const url = this.navLinksArray[index];
        this.navCtrl.navigateRoot(url);
      } else {
        navigator.app.exitApp();
      }
    });
  }

  async getStudents() {
    try {
      const request: any = await this.handlerService.run(this.studentService.getStudents());
      this.students = request.data.students;
    } catch (e) {
      this.handlerService.presentAlert(e.error.message, e);
    }
  }

  // initNotification() {
  //   this.fcm.subscribeToTopic('people');
  //
  //   this.fcm.getToken().then(token => {
  //     this.authService.storItem('fcmToken', token);
  //   });
  //
  //   this.fcm.onNotification().subscribe((data: any) => {
  //     if (data.wasTapped) {
  //       console.log('Received in background');
  //     } else {
  //       console.log('Received in foreground');
  //     }
  //   });
  //
  //   this.fcm.onTokenRefresh().subscribe(token => {
  //     this.authService.storItem('fcmToken', token);
  //   });
  //
  //   this.fcm.unsubscribeFromTopic('people');
  // }

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
        },
        {
          title: 'Quizzes',
          url: '/quizzes',
          icon: 'logo-game-controller-b'
        }
      ];
    }
  }

  studentsScrollFunc(status: boolean) {
    this.studentsScrolling = status;
  }


}
