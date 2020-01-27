import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-quiz-timer',
  templateUrl: './quiz-timer.component.html',
  styleUrls: ['./quiz-timer.component.scss'],
})
export class QuizTimerComponent implements OnInit {

  @Input('minute') startMinute: number;
  @Output('end') endEvent: EventEmitter<any> = new EventEmitter();
  @Output('everySecond') everySecondEvent: EventEmitter<any> = new EventEmitter();

  private timer;

  private timeToSeconds: number = this.startMinute * 60;
  private printTimer: string;

  constructor() { }

  ngOnInit() {
    this.start();
  }

  private start() {
    this.timeToSeconds = this.startMinute * 60;
    this.timer = timer(0, 1000)
        .subscribe(() => {
          this.printTimer = this.mmss(this.timeToSeconds);
          if (!this.timeToSeconds) {
            return this.end();
          }
          this.timeToSeconds--;
        });
  }

  private end() {
    this.timer.unsubscribe();
    this.timer.remove();
    this.endEvent.emit({duration: this.startMinute});
  }

  // private everySecond() {
  //   this.everySecondEvent.emit()
  // }

  public stop() {
    const passedTime = this.startMinute * 60 - this.timeToSeconds;
    this.timeToSeconds = this.startMinute * 60;
    this.timer.unsubscribe();
    this.timer.remove();
    return this.mmss(passedTime);
  }

  public pause() {
    this.timer.unsubscribe();
  }

  public resume() {
    this.start();
  }

  /* Helpers */
  private pad(num) {
    return ('0' + num).slice(-2);
  }

  private mmss(secs): string {
    let minutes = Math.floor(secs / 60);
    secs = secs % 60;
    minutes = minutes % 60;
    return `${this.pad(minutes)}:${this.pad(secs)}`;
  }
}
