import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import AppParams from '../../../params';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent implements OnInit {

  appParams = AppParams;
  @Input('results') results: any[] = [];

  constructor(
      public modalController: ModalController,
      public router: Router
  ) { }

  ngOnInit() {
  }

  getRowClass(row) {
    return row.status ? 'text-success' : 'text-danger';
  }

  dismiss() {
      this.router.navigate(['/quizzes']);
      this.modalController.dismiss();
  }

}
