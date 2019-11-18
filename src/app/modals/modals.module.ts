import {NgModule} from '@angular/core';
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
        FundamentalsSlidersComponent
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
        FundamentalsSlidersComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
    ],
})

export class ModalsModule {}
