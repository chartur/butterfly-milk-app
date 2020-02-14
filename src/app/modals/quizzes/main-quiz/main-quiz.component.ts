import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {QuizzesService} from '../../../services/quizzes.service';
import {HandleService} from '../../../services/handle.service';
import {LoadingPreference} from '../../../preferences/LoadingPreference';
import {QuizResultsComponent} from '../quiz-results/quiz-results.component';
import {QuizTimerComponent, TimeNotice} from '../../../components/quizzes/quiz-timer/quiz-timer.component';
import {QuizStartConfirmationComponent} from '../quiz-start-confirmation/quiz-start-confirmation.component';

@Component({
  selector: 'app-main-quiz',
  templateUrl: './main-quiz.component.html',
  styleUrls: ['./main-quiz.component.scss'],
})
export class MainQuizComponent implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    passiveListeners: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'custom',
      dynamicBullets: true,
      clickable: true,
      renderCustom:  (swiper, current, total) => {
        return this.renderPagination(current, total, swiper);
      },
    }
  };
  @ViewChild('timerElement') timerElement: QuizTimerComponent;
  questions: any[] = [];
  timer: number;
  quizMainData: any;
  timerOptions: TimeNotice = new TimeNotice(3, 'text-danger', );
  @Input('quizId') quizId: string;
  @Input('passedPosition') passedPosition: number = null;
  constructor(
      public modalController: ModalController,
      private quizzesService: QuizzesService,
      private handler: HandleService,
      private loadingPref: LoadingPreference,
      public alertController: AlertController
  ) { }

  ngOnInit(
  ) {
    this.getQuizData();
  }

  async getQuizData() {
    const loading = await this.loadingPref.make();
    loading.present();
    try {
      const request: any = await this.handler.run(this.quizzesService.getQuizDataById(this.quizId));
      this.questions = request.data.questions;
      this.quizMainData = request.data.quizMainData;
      this.timer = request.data.time;
      loading.dismiss();
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
      loading.dismiss();
    }
  }

  async submitQuiz() {
    const done: boolean = this.questions.find((item) => {
      if (!item.hasOwnProperty('checkedAnswerIndex') || item.checkedAnswerIndex === null) {
        return true;
      }
    });

    const alertOption: any = {
      header: 'Submit Quiz',
      message: !done ? 'Are you sure you want to submit quiz?' : 'Quiz cannot be submitted until all questions have been answered.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    };

    if (!done) {
      alertOption.buttons.push({
        text: 'Accept',
        handler: () => {
          this.sendQuizData();
        }
      });
    }

    const alert = await this.alertController.create(alertOption);
    await alert.present();
  }

  questionAnswered(data: any) {
    const indexOfQuestion: number = this.questions.indexOf(data.question);
    this.questions[indexOfQuestion].checkedAnswerIndex = data.checkedAnswerIndex;
  }

  async timePassed(data) {
    const alertOption: any = {
      header: 'Time Passed',
      message: 'Your quiz time is passed!',
      buttons: [
        {
          text: 'Submit',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.sendQuizData();
          }
        }
      ]
    };

    const alert = await this.alertController.create(alertOption);
    await alert.present();
  }

  async sendQuizData() {
    const loading = await this.loadingPref.make();
    loading.present();
    try {
      const passedTime = this.timerElement.stop();

      const request: any = await this.handler.run(this.quizzesService.submitQuiz(this.quizId, {data: this.questions, passedTime}));
      const getQuizEndData: any = await this.handler.run(this.quizzesService.getQuizEndData(this.quizId));

      this.modalController.dismiss();

      loading.dismiss();

      const seeResultModal = await this.modalController.create({
        component: QuizStartConfirmationComponent,
        componentProps: {
          quizData: getQuizEndData,
          closeButton: false,
          withChildrenImage: false,
          buttonText: 'See Result'
        }
      });

      seeResultModal.onDidDismiss().then(async () => {
        const resultModal = await this.modalController.create({
          component: QuizResultsComponent,
          componentProps: {
            results: request,
            quizImage: getQuizEndData.resultImageFile,
            quizAudio: getQuizEndData.resultAudioFile,
            passed: getQuizEndData.passed,
            needScope: getQuizEndData.needScope,
            quizId: this.quizId,
            passedPosition: this.passedPosition
          }
        });
        return await resultModal.present();
      });
      await seeResultModal.present();
    } catch (e) {
      this.handler.presentAlert(e.error.message, e);
      loading.dismiss();
    }
  }

  async dismiss() {
    const alert = await this.alertController.create({
      header: 'Exit?',
      message: 'Are you sure you want to quit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Yes, I want',
          handler: () => {
            this.timerElement.stop();
            this.modalController.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  private renderPagination(current: number, total: number, swiper) {
    let pagination = '';
    for (let i = 0; i < total; i++) {
      const question = this.questions[i];
      let extraClassName = '';

      if ((i + 1) === current) {
        extraClassName = 'current';
      } else if (question.hasOwnProperty('checkedAnswerIndex') && question.checkedAnswerIndex !== null) {
        extraClassName = 'done';
      } else if (!question.hasOwnProperty('checkedAnswerIndex') || question.checkedAnswerIndex === null) {
        extraClassName = 'missed';
      }
      pagination += `<span class="slider-custom-pagination-item mr-2 ${extraClassName}">${i + 1}</span>`;
    }
    return pagination;
  }
}
