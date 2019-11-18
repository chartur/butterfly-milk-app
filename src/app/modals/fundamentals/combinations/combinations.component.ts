import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController, NavParams} from '@ionic/angular';
import {FundamentalsService} from '../../../services/fundamentals.service';
import {HandleService} from '../../../services/handle.service';
import {LoadingPreference} from '../../../preferences/LoadingPreference';

@Component({
  selector: 'app-combinations',
  templateUrl: './combinations.component.html',
  styleUrls: ['./combinations.component.scss'],
})
export class CombinationsComponent implements OnInit {

  @Input() combinationName: string;
  @Input() combinationId: number;
  items: any = {words: []};

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      public navParams: NavParams,
      public modalController: ModalController,
      private fundamentalsService: FundamentalsService,
      private handler: HandleService,
      private loadingPref: LoadingPreference,
  ) {
    this.combinationName = navParams.get('combinationName');
    this.combinationId = navParams.get('combinationId');
  }

  async getWords() {
    try {
      const request: any = await this.handler.run(this.fundamentalsService.getCombinationWordsById(this.combinationId));
      this.items = request.data;
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  async ngOnInit() {
    const loading = await this.loadingPref.make();
    loading.present();

    await this.getWords();

    loading.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
