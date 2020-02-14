import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import AppParams from '../../../params';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-quiz-start-confirmation',
  templateUrl: './quiz-start-confirmation.component.html',
  styleUrls: ['./quiz-start-confirmation.component.scss'],
})
export class QuizStartConfirmationComponent implements OnInit, AfterViewInit {

  appParams = AppParams;
  @Input('quizData') quizData: any;

  @Input('closeButton') closeButton: boolean = true;
  @Input('withChildrenImage') withChildrenImage: boolean = true;
  @Input('buttonText') buttonText: string = 'Start Quiz';

  @ViewChild('audio') audio: ElementRef;

  constructor(public modalController: ModalController) { }

  ngOnInit() {

  }

  playAudio() {
    if (this.quizData.audioFile) {
      this.audio.nativeElement.play();
    }
  }

  ngAfterViewInit() {
    this.playAudio();
  }

  dismiss(accepted: boolean = false) {
    this.modalController.dismiss(accepted);
  }

}
