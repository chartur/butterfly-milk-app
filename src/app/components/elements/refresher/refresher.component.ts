import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.component.html',
  styleUrls: ['./refresher.component.scss'],
})
export class RefresherComponent implements OnInit {

  constructor(
      private navCtrl: NavController,
      private router: Router,
  ) { }

  ngOnInit() {}

  doRefresh(event) {
    this.navCtrl.navigateRoot(this.router.url);
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
