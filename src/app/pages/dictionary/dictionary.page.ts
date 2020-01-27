import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import AppParams from '../../params';
import {LoadingPreference} from '../../preferences/LoadingPreference';
import {DictionaryService} from '../../services/dictionary.service';
import {HandleService} from '../../services/handle.service';
import {RouterPage} from '../../helpers/RouterPage';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {WordDetailsComponent} from '../../modals/word/word-details/word-details.component';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
})
export class DictionaryPage extends RouterPage implements OnInit, OnDestroy {

  params = AppParams;
  viewType = false;
  words: any[] = [];
  years: string[] = [];
  staticCount: number;
  globalCount: number;
  page: number;
  months: string[] = [];
  searchForm: FormGroup = new FormGroup({
    search: new FormControl(),
    year: new FormControl(),
    month: new FormControl(),
    letter: new FormControl()
  });
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private loadingPref: LoadingPreference,
      public modalController: ModalController,
      private dictionaryService: DictionaryService,
      private handler: HandleService,
  ) {
    super(router, route);
  }

  async onEnter() {
    const loading = await this.loadingPref.make();
    loading.present();

    this.staticCount = 10;
    this.page = 1;
    this.words = [];
    this.submitForm();

    loading.dismiss();
  }

  ngOnInit(): void {
  }

  async submitForm() {
    if (this.viewType) {
      this.searchForm.controls.letter.setValue('') ;
    } else {
      this.searchForm.controls.month.setValue('') ;
      this.searchForm.controls.year.setValue('') ;
    }

    !this.searchForm.controls.year.value ? this.searchForm.controls.month.disable() : this.searchForm.controls.month.enable();

    const data = this.searchForm.value;
    data.page = this.page;
    data.staticCount = this.staticCount;


    try {
      const request: any = await this.handler.run(this.dictionaryService.getWordsBySearch(data));
      this.years = request.years;
      this.globalCount = request.count;
      this.words = request.words;
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  async getStudentDictionaryMonths() {
    try {
      this.searchForm.controls.month.setValue('');
      const year = this.searchForm.controls.year.value;
      const studentMonths: any = await this.handler.run(this.dictionaryService.getStudentMonthOfDictionaryByYear(year));
      this.months = studentMonths.map((month) => {
        return { index: month, name: moment.months(month - 1)};
      });
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  async loadData() {
    this.page++;
    await this.submitForm();
  }

  async wordDetails(word: any) {
    const modal = await this.modalController.create({
      component: WordDetailsComponent,
      componentProps: {wordId: word.word.id, changeViewedStatusOfWord: true}
    });
    await modal.present();
    word.viewed = 1;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
