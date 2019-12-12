import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {HandleService} from '../../../services/handle.service';
import {LoadingPreference} from '../../../preferences/LoadingPreference';
import {DictionaryService} from '../../../services/dictionary.service';
import AppParams from '../../../params';

@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.scss'],
})
export class WordDetailsComponent implements OnInit {

  appParams = AppParams;
  word: any = false;
  playerHtml: string;

  @Input() wordId: number;
  @Input() changeViewedStatusOfWord: boolean;
  constructor(
      public navParams: NavParams,
      public modalController: ModalController,
      private handler: HandleService,
      private loadingPref: LoadingPreference,
      private dictionaryService: DictionaryService,
      private ref: ChangeDetectorRef,
  ) {
    this.wordId = navParams.get('wordId');
    this.changeViewedStatusOfWord = navParams.get('changeViewedStatusOfWord');
  }

  async ngOnInit() {
    this.word = false;
    const loading = await this.loadingPref.make();
    loading.present();

    if (this.changeViewedStatusOfWord) {
      await this.makeWordAsViewed();
    }
    await this.getDetails();

    loading.dismiss();
  }

  async getDetails() {
    try {
      const request: any = await this.handler.run(this.dictionaryService.getWordDetails(this.wordId));
      this.word = request.word;
      console.log(this.word);
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  async makeWordAsViewed() {
    try {
      const request: any = await this.handler.run(this.dictionaryService.makeWordAsViewed(this.wordId));
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
    }
  }

  readWord(word: any, audioElement, onlyFullSound: boolean = false) {
    console.log(word);
    const timing = word.timing * 1000;
    const mainWord = word.word;
    if (!word.soundfile_path) {
      return this.handler.makeToast('No sound file available for this word!');
    }

    if (onlyFullSound) {
        audioElement.onended = () => {
            this.playerHtml = '';
        };
        audioElement.src = this.appParams.makeStaticUrl(word.soundfile_path);
        audioElement.play();
        this.playerHtml = `<span class="text-danger">${ mainWord }</span>`;
        return;
    }

    if (word.syllables.length) {
      let wordForCheckig = '';
      for (const syllable of word.syllables) {
        wordForCheckig += syllable.syllable;
      }
      wordForCheckig = wordForCheckig.toLowerCase().trim();

      if (wordForCheckig !== mainWord.trim().toLowerCase()) {
        audioElement.onended = () => {
          this.playerHtml = '';
        };
        audioElement.src = this.appParams.makeStaticUrl(word.soundfile_path);
        audioElement.play();
        this.playerHtml = `<span class="text-danger">${ mainWord }</span>`;
      } else {
          const sylls = Object.assign([], word.syllables);
          const originalSylls = Object.assign([], word.syllables);
          this.syllablesPlayer(sylls, audioElement, (word.timing * 1000), originalSylls);
      }
    }
  }

  syllablesPlayer(syllables, audioElement, timing, originalSyllables) {
      if (!syllables.length) {
          return this.readWord(this.word.word, audioElement, true);
      }
      audioElement.onended = () => {
        setTimeout(() => {
            syllables.shift();
            this.syllablesPlayer(syllables, audioElement, timing, originalSyllables);
        }, timing);

      };
      this.playerHtml = originalSyllables.map((item) => {
        if (syllables[0].syllable === item.syllable) {
            return `<span class="text-danger">${syllables[0].syllable}</span>`;
        } else {
            return `<span>${item.syllable}</span>`;
        }
      }).join('');
      this.ref.detectChanges();
      audioElement.src = this.appParams.makeStaticUrl(syllables[0].soundfile_path);
      audioElement.play();
  }


  dismiss() {
    this.modalController.dismiss();
  }
}
