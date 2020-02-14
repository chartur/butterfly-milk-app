import {Component, OnDestroy} from '@angular/core';
import {RouterPage} from '../../helpers/RouterPage';
import {ActivatedRoute, Router} from '@angular/router';
import {HandleService} from '../../services/handle.service';
import {LoadingPreference} from '../../preferences/LoadingPreference';
import {JournalService} from '../../services/journal.service';
import {ModalController} from '@ionic/angular';
import {ReadingComponent} from '../../modals/journal/reading/reading.component';
import {WritingComponent} from '../../modals/journal/writing/writing.component';
import {VocabComponent} from '../../modals/journal/vocab/vocab.component';
import {TabsServices} from '../../services/tabs.services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends RouterPage implements OnDestroy {

  lessons: any[] = [];

  constructor(
      private handler: HandleService,
      private loadingPref: LoadingPreference,
      private router: Router,
      private route: ActivatedRoute,
      private journalService: JournalService,
      public modalController: ModalController,
      private tabsService: TabsServices
  ) {
    super(router, route);
  }

  async onEnter() {
    this.tabsService.toggleTabsVisibility(true);
    const loading = await this.loadingPref.make();
    loading.present();

    this.getLessons();

    loading.dismiss();
  }

  async getLessons() {
    try {
      const request: any = await this.handler.run(this.journalService.getStudentLessonsByStudent());
      this.lessons = request.lessons;
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  async openBookDetailsModal(bookId: number) {
    const loading = await this.loadingPref.make();
    loading.present();
    try {
      const request: any = await this.handler.run(this.journalService.getBookDetailsById(bookId));
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

  async openWritingModal(lessonId: number) {
    const loading = await this.loadingPref.make();
    loading.present();
    try {
      const request: any = await this.handler.run(this.journalService.getWithingByLessonId(lessonId));
      const modal = await this.modalController.create({
        component: WritingComponent,
        componentProps: {
          image: request.image,
          lesson: request.lesson,
          student: request.student
        }
      });
      loading.dismiss();
      return await modal.present();
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
      loading.dismiss();
    }
  }

  async openVocabulary(lessonId: number) {
    const loading = await this.loadingPref.make();
    loading.present();
    try {
      const request: any = await this.handler.run(this.journalService.getVocabularyOfLessonByStudentId(lessonId));
      const modal = await this.modalController.create({
        component: VocabComponent,
        componentProps: {
          vocabulary: request.vocabulary,
          lesson: request.lesson,
          student: request.student,
        }
      });
      loading.dismiss();
      return await modal.present();
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
      loading.dismiss();
    }
  }

  onDestroy() {
    super.ngOnDestroy();
  }
}
