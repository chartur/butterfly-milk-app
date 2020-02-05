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
  @ViewChild('player') player: ElementRef;

  @Output('checkedByStudent') checkedByStudent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  answer() {

  }

  playAudio() {
    if (this.question.soundfile_path) {
      this.player.nativeElement.play();
    }
  }

  makeCheckedAnswer(index: number) {
    this.checkedAnswerIndex = this.checkedAnswerIndex === index ? null : index;
    this.checkedByStudent.emit({ question: this.question, checkedAnswerIndex: this.checkedAnswerIndex });
  }
}
