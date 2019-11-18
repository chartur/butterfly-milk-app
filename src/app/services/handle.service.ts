import {EventEmitter, Injectable} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import AppParams from '../params';

@Injectable({
  providedIn: 'root',
})
export class HandleService {

  params = AppParams;
  loggedEvent: EventEmitter<boolean> = new EventEmitter();
  constructor(
      public alertController: AlertController,
      private router: Router,
      private http: HttpClient,
      private navCtrl: NavController,
      public toastController: ToastController
  ) {}


  async presentAlert(message: string, err ?: any, header: string = 'Error!' ) {
    if (typeof err !== 'undefined' && err.status === 401) {
      return this.refreshToken();
    }
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {

          }
        },
      ]
    });

    await alert.present();
  }

  async makeToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  run( callback ) {
    return new Promise((resolve, reject) => {
      callback.subscribe(
          (res) => resolve(res),
          (err) => {
            reject(err);
          }
        );
    });
  }

  refreshToken() {
    return this.http.post(this.params.makeUrl(this.params.urls.refreshToken), false)
        .toPromise()
        .then((r:any) => {
          localStorage.setItem('auth_token', r.data);
          this.navCtrl.navigateRoot(this.router.url);
        })
        .catch((e) => {
          localStorage.clear();
          this.navCtrl.navigateRoot('/login');
        });
  }
}
