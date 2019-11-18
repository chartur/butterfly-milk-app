import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SyllablesPage } from './syllables.page';
import {ComponentsModule} from '../../../components/elements/components.module';
import {ModalsModule} from '../../../modals/modals.module';

const routes: Routes = [
  {
    path: '',
    component: SyllablesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ModalsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SyllablesPage]
})
export class SyllablesPageModule {}
