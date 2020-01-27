import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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
    if (!this.playerStart) {
        this.HTML = false;
        this.playerStart = true;
    }
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

  playSound(item, element) {
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
        const sound: string = this.appParams.makeStaticUrl(v.soundfile_path);
        data.syllables.push({syllable: v.syllable, file: sound, first: !!!i });
      });
    }
    if (item.soundfile_path) {
      const sound: string = this.appParams.makeStaticUrl(item.soundfile_path);
      data.general = sound;
    }

    if (!data.general && !data.syllables.length) {
        return this.handler.makeToast('No sound file available for this word!');
    }

    this.playerStart = false;
    this.makePlayer(item.timing * 1000, data, item, element);
  }

  makePlayer(timing: number, data: any, item: any, element) {
    if (this.playerStart) {
      return false;
    }
    if (data.syllables.length) {
      element.src = data.syllables[0].file
      element.onended = () => {
        setTimeout(() => {
          data.syllables.shift();
          this.makePlayer(timing, data, item, element);
        }, timing);
      };
      element.play();
      const searchMask = data.syllables[0].first ? data.syllables[0].syllable.capitalize() : data.syllables[0].syllable;
      const regEx = new RegExp(searchMask, 'ig');
      const replaceMask = `<span class="text-danger">${ searchMask }</span>`;
      const html = item.word.replace(regEx, replaceMask);
      this.HTML = html;
    } else if (data.general) {
      element.src = data.general;
      element.onended = () => {
        this.HTML = false;
        this.ref.detectChanges();
        this.playerStart = true;
      };
      element.play();
      this.HTML = '<span class="text-danger">' + item.word + '</span>';
    }
    this.ref.detectChanges();
  }

  sentenceFullReader(sentence: any, element) {
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
          file: this.appParams.makeStaticUrl(item.soundfile_path),
          word: item.word,
          first: !!!index,
        };
      });
      return this.playSentenceSounds(fileData, sentence.title, sentence.html, sentence, element);
    }
    this.playerStart = false;
    element.src = this.appParams.makeStaticUrl(sentence.soundfile_path);
    element.onended = () => {
      this.playerStart = true;
      this.fullSentencePlay = false;
    };
    element.play();
  }

  playSentenceSounds(fileData: any[], text: string, html: string, sentence: any, element, current: number = 0) {
    if (current <= fileData.length - 1) {
      const h = fileData.map((item, index) => {
          if (index === current) {
            return `<span class="text-danger">${item.word}</span>`;
          }
          return `<span>${item.word}</span>`;
      });
      this.playerStart = false;
      element.src = fileData[current].file;
      element.onended = () => {
        setTimeout(() => {
          current++;
          this.playSentenceSounds(fileData, text, html, sentence, element, current);
        }, sentence.timing * 1000);
      };
      sentence.html = h.join(' ');
      element.play();
      this.ref.detectChanges();
    } else {
      if (sentence.soundfile_path) {
        element.src = this.appParams.makeStaticUrl(sentence.soundfile_path);
        element.onended = () => {
          this.playerStart = true;
        };
        element.play();
      } else {
        this.playerStart = true;
      }
      sentence.html = html;
      this.fullSentencePlay = false;
      this.ref.detectChanges();
    }

  }

  playSentenceWord(el, word, element) {
    if (!word.soundfile_path) {
        return false;
    }

    element.src = this.appParams.makeStaticUrl(word.soundfile_path);
    element.onended = () => {
      el.classList.remove('text-danger');
    };
    element.play();
    el.classList.add('text-danger');
  }
}
