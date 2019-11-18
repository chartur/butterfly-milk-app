import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController, NavParams} from '@ionic/angular';
import {FundamentalsService} from '../../../services/fundamentals.service';
import {HandleService} from '../../../services/handle.service';
import {LoadingPreference} from '../../../preferences/LoadingPreference';

@Component({
  selector: 'app-sight-words',
  templateUrl: './sight-words.component.html',
  styleUrls: ['./sight-words.component.scss'],
})
export class SightWordsComponent implements OnInit {

  @Input() bookId: number;
  @Input() bookTitle: string;
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
    this.bookId = navParams.get('bookId');
    this.bookTitle = navParams.get('bookTitle');
  }

  async getWordsOfBook() {
    try {
      const request: any = await this.handler.run(this.fundamentalsService.getWordsOfBookById(this.bookId));
      this.items = request.data.book;
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  async ngOnInit() {
    const loading = await this.loadingPref.make();
    loading.present();

    await this.getWordsOfBook();

    loading.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
