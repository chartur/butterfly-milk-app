import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import {RouterPage} from '../../../helpers/RouterPage';
import {ActivatedRoute, Router} from '@angular/router';
import {HandleService} from '../../../services/handle.service';
import {FundamentalsService} from '../../../services/fundamentals.service';
import {ModalController} from '@ionic/angular';
import {CombinationsComponent} from '../../../modals/fundamentals/combinations/combinations.component';
import {LoadingPreference} from '../../../preferences/LoadingPreference';

@Component({
  selector: 'app-combinations',
  templateUrl: './combinations.page.html',
  styleUrls: ['./combinations.page.scss'],
})
export class CombinationsPage extends RouterPage implements OnInit, OnDestroy {

  combinations: any[];
  staticCount: number;
  lastItemId: number;
  globalCount: number;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private handler: HandleService,
      private fundamentalsService: FundamentalsService,
      public modalController: ModalController,
      private loadingPref: LoadingPreference,
  ) {
    super(router, route);
  }

  ngOnInit() {
  }

  async onEnter() {
    this.staticCount = 10;
    this.lastItemId = 0;
    this.combinations = [];
    const loading = await this.loadingPref.make();
    loading.present();
    await this.getCombinations();
    loading.dismiss();
  }

  async getCombinations() {
    try {
      const request: any = await this.handler.run(this.fundamentalsService.getCombinationWords(this.lastItemId, this.staticCount));
      this.globalCount = request.data.count;
      this.combinations = this.combinations.concat(request.data.combinations);
      this.lastItemId = this.combinations.length ? this.combinations[this.combinations.length - 1].id : 0;
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  async clickOnCombination(combination) {
    const modal = await this.modalController.create({
      component: CombinationsComponent,
      componentProps: {
        combinationId: combination.id,
        combinationName: combination.name
      }
    });
    return await modal.present();
  }

  async loadData(event) {
    await this.getCombinations();
    event.target.complete();
    if (this.combinations.length >= this.globalCount) {
      event.target.disabled = true;
    }
  }
}
