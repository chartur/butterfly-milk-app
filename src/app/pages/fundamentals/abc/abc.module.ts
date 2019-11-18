import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AbcPage } from './abc.page';
import {ComponentsModule} from '../../../components/elements/components.module';
import {ModalsModule} from '../../../modals/modals.module';

const routes: Routes = [
  {
    path: '',
    component: AbcPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ModalsModule,
  ],
  declarations: [AbcPage]
})
export class AbcPageModule {}
