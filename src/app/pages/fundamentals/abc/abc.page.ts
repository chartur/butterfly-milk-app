import {Component, OnDestroy, OnInit} from '@angular/core';
import AppParams from '../../../params';
import {RouterPage} from '../../../helpers/RouterPage';
import {ActivatedRoute, Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import {AbcComponent} from '../../../modals/fundamentals/abc/abc.component';

@Component({
  selector: 'app-abc',
  templateUrl: './abc.page.html',
  styleUrls: ['./abc.page.scss'],
})
export class AbcPage extends RouterPage implements OnInit, OnDestroy {

  appParams = AppParams;
  alphabet: string[][] = this.chunk(this.appParams.genCharArray('a', 'z'), 3);

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      public modalController: ModalController,
  ) {
    super(router, route);
  }

  ngOnInit() {
  }

  onEnter() {
  }

  async clickOnLetter(lett: string) {
    const modal = await this.modalController.create({
      component: AbcComponent,
      componentProps: {
        letter: lett
      }
    });
    return await modal.present();
  }

  chunk(array, chunkSize) {
    return [].concat.apply([],
        array.map( (elem, i) => {
          return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
        })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
