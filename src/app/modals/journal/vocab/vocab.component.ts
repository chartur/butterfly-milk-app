import {Component, Input, OnInit} from '@angular/core';
import AppParams from '../../../params';
import {ModalController, NavParams} from '@ionic/angular';
import {WordDetailsComponent} from '../../word/word-details/word-details.component';

@Component({
  selector: 'app-vocab',
  templateUrl: './vocab.component.html',
  styleUrls: ['./vocab.component.scss'],
})
export class VocabComponent implements OnInit {

  appParams = AppParams;
  @Input() vocabulary: any;
  @Input() lesson: any;
  @Input() student: any;
  constructor(
      public navParams: NavParams,
      public modalController: ModalController,
  ) {
    this.vocabulary = this.navParams.get('vocabulary');
  }

  ngOnInit() {}

  async wordDetails(wordId) {
    const modal = await this.modalController.create({
      component: WordDetailsComponent,
      componentProps: {wordId, changeViewedStatusOfWord: false}
    });
    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
