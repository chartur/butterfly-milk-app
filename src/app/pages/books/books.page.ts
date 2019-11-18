import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterPage} from '../../helpers/RouterPage';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingPreference} from '../../preferences/LoadingPreference';
import {ModalController} from '@ionic/angular';
import {HandleService} from '../../services/handle.service';
import {BooksService} from '../../services/books.service';
import {ReadingComponent} from '../../modals/journal/reading/reading.component';
import {JournalService} from '../../services/journal.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage extends RouterPage implements OnInit, OnDestroy {

  studentBooks: any[] = [];
  tblStyle = 'bootstrap';
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private loadingPref: LoadingPreference,
      private booksService: BooksService,
      private handler: HandleService,
      private journalService: JournalService,
      public modalController: ModalController,
  ) {
    super(router, route);
  }

  async onEnter() {
    const loading = await this.loadingPref.make();
    loading.present();

    this.getBooks();

    loading.dismiss();
  }

  async getBooks() {
    try {
      const request: any = await this.handler.run(this.booksService.getStudentBooks());
      this.studentBooks = request.studentBooks;
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  ngOnInit() {
  }

  async onActivate(event) {
    if (event.type !== 'click') {
      return false;
    }
    const loading = await this.loadingPref.make();
    loading.present();
    try {
      const request: any = await this.handler.run(this.journalService.getBookDetailsById(event.row.book.id));
      const modal = await this.modalController.create({
        component: ReadingComponent,
        componentProps: {
          book: request.book
        }
      });
      loading.dismiss();
      return await modal.present();
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
      loading.dismiss();
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
