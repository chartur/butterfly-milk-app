import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';

import AppParams from '../../../params';
import {HandleService} from '../../../services/handle.service';
import {ChangeDetectorRef} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {LoadingPreference} from '../../../preferences/LoadingPreference';

@Component({
  selector: 'app-fundamentals-sliders',
  templateUrl: './fundamentals-sliders.component.html',
  styleUrls: ['./fundamentals-sliders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FundamentalsSlidersComponent implements OnInit, OnChanges {

  HTML: any = false;
  playerStart = true;
  appParams = AppParams;
  fullSentencePlay = false;
  @Input('items') items: any[] = [];
  slideOpts: any = {
    speed: 400,
  };
  constructor(
      private media: Media,
      private ref: ChangeDetectorRef,
      private handler: HandleService,
      private loadingPref: LoadingPreference,
  ) {}

  ngOnChanges() {
    if (this.items.length) {
      this.slideChanged(undefined, 0);
    }
  }

  ngOnInit() {
  }

  async slideChanged(wordSlide: IonSlides, setIndex: number) {
    const loading = await this.loadingPref.make();
    loading.present();

    if (typeof setIndex === 'undefined') {
      setIndex = await wordSlide.getActiveIndex();
    }

    const item = this.items[setIndex];
    if (typeof item === 'undefined' || !item.sentences || !item.sentences.length) {
      this.fullSentencePlay = false;
      return loading.dismiss();
    }

    if (!item.sentences[0].words.length) {
      this.fullSentencePlay = true;
      return loading.dismiss();
    }

    const allWordsHaveSoundFile = item.sentences[0].words.find((i) => {
      if (!i.soundfile_path) {
        return true;
      }
    });

    this.fullSentencePlay = typeof allWordsHaveSoundFile !== 'undefined';
    return loading.dismiss();
  }

  playSound(item) {
    if (!this.playerStart) {
      return false;
    }
    const data: any = { general: '', syllables: [], html: item.html };
    if (item.syllables.length) {
      item.syllables.forEach( (v, i) => {
        if (!v.soundfile_path) {
          data.syllables = [];
          return false;
        }
        const file: MediaObject = this.media.create(this.appParams.makeStaticUrl(v.soundfile_path));
        data.syllables.push({syllable: v.syllable, file, first: !!!i });
      });
    }
    if (item.soundfile_path) {
      const file: MediaObject = this.media.create(this.appParams.makeStaticUrl(item.soundfile_path));
      data.general = file;
    }

    if (!data.general && !data.syllables.length) {
        return this.handler.makeToast('No sound file available for this word!');
    }

    this.playerStart = false;
    this.makePlayer(item.timing * 1000, data, item);
  }

  makePlayer(timing: number, data: any, item: any) {
    if (data.syllables.length) {
      data.syllables[0].file.onSuccess.subscribe(() => {
        setTimeout(() => {
          data.syllables.shift();
          this.makePlayer(timing, data, item);
        }, timing);
      });
      data.syllables[0].file.play();
      const searchMask = data.syllables[0].first ? data.syllables[0].syllable.capitalize() : data.syllables[0].syllable;
      const regEx = new RegExp(searchMask, 'ig');
      const replaceMask = `<span class="text-danger">${ searchMask }</span>`;
      const html = item.word.replace(regEx, replaceMask);
      this.HTML = html;
    } else if (data.general) {
      data.general.onSuccess.subscribe(() => {
        this.HTML = false;
        this.ref.detectChanges();
        this.playerStart = true;
      });
      data.general.play();
      this.HTML = '<span class="text-danger">' + item.word + '</span>';
    }
    this.ref.detectChanges();
  }

  sentenceFullReader(sentence: any) {
    if (!this.playerStart) {
      return false;
    }
    this.fullSentencePlay = true;
    const wordsCountOfSentenceTitle  = sentence.title.split(' ').length;
    const wordsCount  = sentence.words.length;
    const allWordsHaveSoundFile = sentence.words.find((item) => {
      if (!item.soundfile_path) {
        return true;
      }
    });

    if (wordsCountOfSentenceTitle === wordsCount && typeof allWordsHaveSoundFile === 'undefined') {
      const fileData = sentence.words.map((item, index) => {
        return {
          file: this.media.create(this.appParams.makeStaticUrl(item.soundfile_path)),
          word: item.word,
          first: !!!index,
        };
      });
      return this.playSentenceSounds(fileData, sentence.title, sentence.html, sentence);
    }
    this.playerStart = false;
    const file: MediaObject = this.media.create(this.appParams.makeStaticUrl(sentence.soundfile_path));
    file.onSuccess.subscribe(() => {
      this.playerStart = true;
      this.fullSentencePlay = false;
    });
    file.play();
  }

  playSentenceSounds(fileData: any[], text: string, html: string, sentence: any, current: number = 0) {
    if (current <= fileData.length - 1) {
      const h = fileData.map((item, index) => {
          if (index === current) {
            return `<span class="text-danger">${item.word}</span>`;
          }
          return `<span>${item.word}</span>`;
      });
      this.playerStart = false;
      fileData[current].file.onSuccess.subscribe(() => {
        setTimeout(() => {
          current++;
          this.playSentenceSounds(fileData, text, html, sentence, current);
        }, sentence.timing * 1000);
      });
      sentence.html = h.join(' ');
      fileData[current].file.play();
      this.ref.detectChanges();
    } else {
      if (sentence.soundfile_path) {
        const file: MediaObject = this.media.create(this.appParams.makeStaticUrl(sentence.soundfile_path));
        file.onSuccess.subscribe(() => {
          this.playerStart = true;
        });
        file.play();
      } else {
        this.playerStart = true;
      }
      sentence.html = html;
      this.fullSentencePlay = false;
      this.ref.detectChanges();
    }

  }

  playSentenceWord(el, word) {
    if (!word.soundfile_path) {
        return false;
    }

    const file: MediaObject = this.media.create(this.appParams.makeStaticUrl(word.soundfile_path));
    file.onSuccess.subscribe(() => {
      el.classList.remove('text-danger');
    });
    file.play();
    el.classList.add('text-danger');
  }
}
