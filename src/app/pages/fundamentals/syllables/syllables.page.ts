import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterPage} from '../../../helpers/RouterPage';
import AppParams from '../../../params';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {SyllablesComponent} from '../../../modals/fundamentals/syllables/syllables.component';

@Component({
  selector: 'app-syllables',
  templateUrl: './syllables.page.html',
  styleUrls: ['./syllables.page.scss'],
})
export class SyllablesPage extends RouterPage implements OnInit, OnDestroy {

  appParams = AppParams;
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      public modalController: ModalController,
  ) {
    super(router, route);
  }

  ngOnInit() {
  }

  onEnter() {}

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  async clickOnSyllable(count: number) {
    const modal = await this.modalController.create({
      component: SyllablesComponent,
      componentProps: {count}
    });
    return await modal.present();
  }
}
