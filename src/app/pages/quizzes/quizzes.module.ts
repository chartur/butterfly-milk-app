import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';


import { IonicModule } from '@ionic/angular';

import { QuizzesPage } from './quizzes.page';

const routes: Routes = [
  {
    path: '',
    component: QuizzesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ScreenOrientation,
    AndroidFullScreen
  ],
  declarations: [QuizzesPage]
})
export class QuizzesPageModule {}
