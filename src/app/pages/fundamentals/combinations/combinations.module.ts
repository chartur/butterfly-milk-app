import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CombinationsPage } from './combinations.page';
import {ModalsModule} from '../../../modals/modals.module';

const routes: Routes = [
  {
    path: '',
    component: CombinationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CombinationsPage]
})
export class CombinationsPageModule {}
