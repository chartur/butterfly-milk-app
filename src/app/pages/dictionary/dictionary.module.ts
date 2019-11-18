import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DictionaryPage } from './dictionary.page';
import {ComponentsModule} from '../../components/elements/components.module';
import {ModalsModule} from '../../modals/modals.module';

const routes: Routes = [
  {
    path: '',
    component: DictionaryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ModalsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DictionaryPage]
})
export class DictionaryPageModule {}
