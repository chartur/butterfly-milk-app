import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {FundamentalsService} from '../../../services/fundamentals.service';
import {HandleService} from '../../../services/handle.service';
import {LoadingPreference} from '../../../preferences/LoadingPreference';

@Component({
  selector: 'app-abc',
  templateUrl: './abc.component.html',
  styleUrls: ['./abc.component.scss'],
})
export class AbcComponent implements OnInit {

  @Input() letter: string;
  items: any = {words: []};

  constructor(
      public navParams: NavParams,
      public modalController: ModalController,
      private fundamentalsService: FundamentalsService,
      private handler: HandleService,
      private loadingPref: LoadingPreference,
  ) {
    this.letter = navParams.get('letter');
  }

  async getWords() {
    try {
      const request: any = await this.handler.run(this.fundamentalsService.getAbcWordsByLetter(this.letter));
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
