/* Modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {CustomHttpInterceptor} from './helpers/CustomHttpInterceptor';

/* Packages */
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { DatePipe} from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { FCM } from '@ionic-native/fcm/ngx';

/* Custom Imports */
import { AppComponent } from './app.component';
import { LoadingPreference } from './preferences/LoadingPreference';
import {TabsPage} from './tabline/tab';

@NgModule({
  declarations: [
    AppComponent,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    LoadingPreference,
    PhotoViewer,
    // FCM,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
