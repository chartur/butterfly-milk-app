import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {RouterPage} from '../../helpers/RouterPage';
import {ActivatedRoute, Router} from '@angular/router';


import AppParams from '../../params';
import {HandleService} from '../../services/handle.service';
import {LoadingPreference} from '../../preferences/LoadingPreference';
import {FundamentalsService} from '../../services/fundamentals.service';


@Component({
  selector: 'app-fundamentals',
  templateUrl: './fundamentals.page.html',
  styleUrls: ['./fundamentals.page.scss'],
})
export class FundamentalsPage extends RouterPage implements OnInit, OnDestroy {

  appParams = AppParams;
  indexPage: any = {abc: false, fundamentals: false, syllables: false, sightWords: false};

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private handler: HandleService,
      private loadingPref: LoadingPreference,
      private fundamentalsService: FundamentalsService
  ) {
    super(router, route);
  }

  ngOnInit() {
  }

  async onEnter() {
    const loading = await this.loadingPref.make();
    loading.present();
    await this.getDataForIndexPage();
    loading.dismiss();
  }

  async getDataForIndexPage() {
    try {
      const request: any = await this.handler.run(this.fundamentalsService.getFundamentalsIndexPage());
      this.indexPage = request.data;
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }



}
