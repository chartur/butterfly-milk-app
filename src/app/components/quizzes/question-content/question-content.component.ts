import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import AppParams from '../../../params';

@Component({
  selector: 'app-question-content',
  templateUrl: './question-content.component.html',
  styleUrls: ['./question-content.component.scss'],
})
export class QuestionContentComponent implements OnInit {

  appParams = AppParams;
  checkedAnswerIndex: number = null;
  @Input('question') question: any;
  @Input('readAnswersAfterSelect') readAnswersAfterSelect: boolean = false;
  @ViewChild('player') player: ElementRef;
  @ViewChild('readAnswer') readAnswer: ElementRef;

  @Output('checkedByStudent') checkedByStudent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  playAudio() {
    if (this.question.soundfile_path) {
      this.player.nativeElement.play();
    }
  }

  makeCheckedAnswer(index: number, answer) {
    if (this.readAnswersAfterSelect && answer.soundfile_path) {
      this.readAnswer.nativeElement.src = this.appParams.makeStaticUrl(answer.soundfile_path);
      this.readAnswer.nativeElement.play();
    }
    this.checkedAnswerIndex = this.checkedAnswerIndex === index ? null : index;
    this.checkedByStudent.emit({ question: this.question, checkedAnswerIndex: this.checkedAnswerIndex });
  }
}
