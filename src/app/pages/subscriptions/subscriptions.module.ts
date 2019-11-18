import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubscriptionsPage } from './subscriptions.page';
import {ImagesComponent} from '../../components/subscription/images/images.component';
import {NotificationSettingsComponent} from '../../components/subscription/notification-settings/notification-settings.component';
import {ComponentsModule} from '../../components/elements/components.module';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [SubscriptionsPage, ImagesComponent, NotificationSettingsComponent]
})
export class SubscriptionsPageModule {}
