import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {HandleService} from '../../../services/handle.service';
import {LoadingPreference} from '../../../preferences/LoadingPreference';
import {DictionaryService} from '../../../services/dictionary.service';
import AppParams from '../../../params';

@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.scss'],
})
export class WordDetailsComponent implements OnInit {

  appParams = AppParams;
  word: any = false;
  @Input() wordId: number;
  @Input() changeViewedStatusOfWord: boolean;
  constructor(
      public navParams: NavParams,
      public modalController: ModalController,
      private handler: HandleService,
      private loadingPref: LoadingPreference,
      private dictionaryService: DictionaryService,
  ) {
    this.wordId = navParams.get('wordId');
    this.changeViewedStatusOfWord = navParams.get('changeViewedStatusOfWord');
  }

  async ngOnInit() {
    this.word = false;
    const loading = await this.loadingPref.make();
    loading.present();

    if (this.changeViewedStatusOfWord) {
      await this.makeWordAsViewed();
    }
    await this.getDetails();

    loading.dismiss();
  }

  async getDetails() {
    try {
      const request: any = await this.handler.run(this.dictionaryService.getWordDetails(this.wordId));
      this.word = request.word;
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  async makeWordAsViewed() {
    try {
      const request: any = await this.handler.run(this.dictionaryService.makeWordAsViewed(this.wordId));
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
