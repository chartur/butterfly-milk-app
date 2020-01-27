import {NgModule} from '@angular/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

import {AbcComponent} from './fundamentals/abc/abc.component';
import {FundamentalsSlidersComponent} from './fundamentals/fundamentals-sliders/fundamentals-sliders.component';
import {CombinationsComponent} from './fundamentals/combinations/combinations.component';
import {SyllablesComponent} from './fundamentals/syllables/syllables.component';
import {SightWordsComponent} from './fundamentals/sight-words/sight-words.component';
import {ReadingComponent} from './journal/reading/reading.component';
import {WritingComponent} from './journal/writing/writing.component';
import {VocabComponent} from './journal/vocab/vocab.component';
import {WordDetailsComponent} from './word/word-details/word-details.component';
import {MainQuizComponent} from './quizzes/main-quiz/main-quiz.component';
import {QuestionContentComponent} from '../components/quizzes/question-content/question-content.component';
import {QuizStartConfirmationComponent} from './quizzes/quiz-start-confirmation/quiz-start-confirmation.component';
import {QuizTimerComponent} from '../components/quizzes/quiz-timer/quiz-timer.component';
import {QuizResultsComponent} from './quizzes/quiz-results/quiz-results.component';

/* Components */

@NgModule({
    declarations: [
        AbcComponent,
        CombinationsComponent,
        SyllablesComponent,
        SightWordsComponent,
        ReadingComponent,
        WritingComponent,
        VocabComponent,
        WordDetailsComponent,
        FundamentalsSlidersComponent,
        MainQuizComponent,
        QuestionContentComponent,
        QuizStartConfirmationComponent,
        QuizTimerComponent,
        QuizResultsComponent,
    ],
    entryComponents: [
        AbcComponent,
        CombinationsComponent,
        SyllablesComponent,
        SightWordsComponent,
        ReadingComponent,
        WritingComponent,
        VocabComponent,
        WordDetailsComponent,
        FundamentalsSlidersComponent,
        MainQuizComponent,
        QuestionContentComponent,
        QuizStartConfirmationComponent,
        QuizTimerComponent,
        QuizResultsComponent
    ],
    imports: [
        NgxDatatableModule,
        IonicModule,
        CommonModule,
    ],
})

export class ModalsModule {}
