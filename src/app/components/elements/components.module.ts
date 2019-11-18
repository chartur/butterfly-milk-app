import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

/* Components */
import { RefresherComponent } from './refresher/refresher.component';

@NgModule({
    declarations: [
        RefresherComponent
    ],
    imports: [IonicModule, CommonModule],
    exports: [
        RefresherComponent
    ]
})

export class ComponentsModule {}
