import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import AppParams from '../../../params';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss'],
})
export class WritingComponent implements OnInit {

  appParams = AppParams;
  @Input() image: any;
  @Input() student: any;
  @Input() lesson: any;
  constructor(
      public navParams: NavParams,
      public modalController: ModalController,
  ) {
    this.image = this.navParams.get('image');
    this.student = this.navParams.get('student');
    this.lesson = this.navParams.get('student');
  }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }
}
