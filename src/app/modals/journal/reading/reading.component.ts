import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import AppParams from '../../../params';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss'],
})
export class ReadingComponent implements OnInit {

  appParams = AppParams;
  @Input() book: any;
  constructor(
      public navParams: NavParams,
      public modalController: ModalController,
  ) {
    this.book = navParams.get('book');
  }

  ngOnInit() {

  }

  dismiss() {
    this.modalController.dismiss();
  }
}
