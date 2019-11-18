import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubscriptionService} from '../../services/subscription.service';
import {HandleService} from '../../services/handle.service';
import {LoadingPreference} from '../../preferences/LoadingPreference';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterPage} from '../../helpers/RouterPage';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage extends RouterPage implements OnInit, OnDestroy {
  student: any;
  notificationSettings: any = {};
  constructor(
      private subscriptionService: SubscriptionService,
      private handler: HandleService,
      private loadingPref: LoadingPreference,
      private router: Router,
      private route: ActivatedRoute
  ) {
    super(router, route);
  }

  ngOnInit() {
  }

  async onEnter() {
    const loading = await this.loadingPref.make();
    loading.present();

    this.getImages();
    this.getNotificationSettings();

    loading.dismiss();
  }

  async getImages() {
    try {
      const request: any = await this.handler.run(this.subscriptionService.getStudentImage());
      this.student = request.data;
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  async getNotificationSettings() {
    try {
      const request: any = await this.handler.run(this.subscriptionService.getStudentNotificationSettings());
      this.notificationSettings = request.data ? request.data : {};
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  async saveNotificationSettings(event) {
      const loading = await this.loadingPref.make();

      loading.present();

      this.notificationSettings.timeSlot = event.timeSlot;
      this.notificationSettings.dayNumber = event.dayNumber;
      try {
        const request: any = await this.handler.run(this.subscriptionService.updateStudentNotificationSettings(this.notificationSettings));
        this.handler.presentAlert(request.message, {}, 'Success!');
      } catch (e) {
        this.handler.presentAlert(e.error.message, e);
      }
      loading.dismiss();
  }
}
