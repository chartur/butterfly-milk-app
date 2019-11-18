import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {ComponentsModule} from '../../components/elements/components.module';
import {ModalsModule} from '../../modals/modals.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { BooksPage } from './books.page';

const routes: Routes = [
  {
    path: '',
    component: BooksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    ComponentsModule,
    ModalsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BooksPage]
})
export class BooksPageModule {}
