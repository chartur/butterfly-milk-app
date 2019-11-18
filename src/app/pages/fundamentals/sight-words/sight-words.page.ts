import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterPage} from '../../../helpers/RouterPage';
import {ActivatedRoute, Router} from '@angular/router';
import AppParams from '../../../params';
import {HandleService} from '../../../services/handle.service';
import {FundamentalsService} from '../../../services/fundamentals.service';
import {ModalController} from '@ionic/angular';
import {LoadingPreference} from '../../../preferences/LoadingPreference';
import {CombinationsComponent} from '../../../modals/fundamentals/combinations/combinations.component';
import {SightWordsComponent} from '../../../modals/fundamentals/sight-words/sight-words.component';

@Component({
  selector: 'app-sight-words',
  templateUrl: './sight-words.page.html',
  styleUrls: ['./sight-words.page.scss'],
})
export class SightWordsPage extends RouterPage implements OnInit, OnDestroy {

  appParams = AppParams;
  books: any[];
  staticCount: number;
  lastItemId: number;
  globalCount: number;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private handler: HandleService,
      private fundamentalsService: FundamentalsService,
      public modalController: ModalController,
      private loadingPref: LoadingPreference,
  ) {
    super(router, route);
  }

  ngOnInit() {
  }

  async onEnter() {
    this.staticCount = 8;
    this.lastItemId = 0;
    this.books = [];
    const loading = await this.loadingPref.make();
    loading.present();
    await this.getBooks();
    loading.dismiss();
  }

  async getBooks() {
    try {
      const request: any = await this.handler.run(this.fundamentalsService.getSightWordsBooks(this.lastItemId, this.staticCount));
      this.globalCount = request.data.count;
      this.books = this.books.concat(request.data.books);
      this.lastItemId = this.books.length ? this.books[this.books.length - 1].id : 0;
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  async clickOnSightWordsBook(book) {
    const modal = await this.modalController.create({
      component: SightWordsComponent,
      componentProps: {
        bookId: book.id,
        bookTitle: book.title
      }
    });
    return await modal.present();
  }

  async loadData(event) {
    await this.getBooks();
    event.target.complete();
    if (this.books.length >= this.globalCount) {
      event.target.disabled = true;
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
