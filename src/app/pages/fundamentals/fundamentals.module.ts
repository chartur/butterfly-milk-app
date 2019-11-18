import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FundamentalsPage } from './fundamentals.page';
import {ComponentsModule} from '../../components/elements/components.module';

const routes: Routes = [
  { path: '', component: FundamentalsPage},

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FundamentalsPage]
})
export class FundamentalsPageModule {}
