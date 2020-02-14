import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import AppParams from '../../../params';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent implements OnInit, AfterViewInit {

  appParams = AppParams;
  @Input('results') results: any[] = [];
  @Input('quizImage') quizImage: string = null;
  @Input('quizAudioImage') quizAudio: string = null;
  @Input('passed') passed: boolean;
  @Input('needScope') needScope: boolean;
  @Input('quizId') quizId: number;
  @Input('passedPosition') passedPosition: number = null;

  @ViewChild('audio') audio: ElementRef
  constructor(
      public modalController: ModalController,
      public router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.passed) {
      this.audio.nativeElement.play();
    }
  }

  getRowClass(row) {
    return row.status ? 'text-success' : 'text-danger';
  }

  dismiss() {
    this.router.navigate([this.passed && this.passedPosition !== null ? `/quizzes/${this.passedPosition}` : '/quizzes' ]);
    this.modalController.dismiss();
  }

}
