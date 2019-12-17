import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import {NavController} from '@ionic/angular';
import {RouterPage} from '../../helpers/RouterPage';
import { TabsPage } from '../../tabline/tab';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.page.html',
  styleUrls: ['./quizzes.page.scss'],
})
export class QuizzesPage extends RouterPage implements OnInit, OnDestroy {

  constructor(
      private screenOrientation: ScreenOrientation,
      private androidFullScreen: AndroidFullScreen,
      private router: Router,
      private navCtrl: NavController,
      private route: ActivatedRoute,
      public tabs: TabsPage,
  ) {
    super(router, route);
  }

  onEnter() {

  }

  ngOnInit() {

  }

  async ionViewDidEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.tabs.toogleTabs(false);
    try {
      await this.androidFullScreen.isImmersiveModeSupported();
      await this.androidFullScreen.immersiveMode();
    } catch (e) {
      console.log('No full screen');
    }

  }

  async ionViewDidLeave() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.tabs.toogleTabs(true);
    this.screenOrientation.unlock();
    try {
      await this.androidFullScreen.isImmersiveModeSupported();
      await this.androidFullScreen.showSystemUI();
    } catch (e) {
      console.log('No full screen');
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
