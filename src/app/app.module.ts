import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Signup } from '../pages/signup/signup';
import { Userpage } from '../pages/userpage/userpage';
import { Team} from '../pages/team/team';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AuthService} from '../shared/authservice';
import{HttpModule} from '@angular/http'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
   ListPage,
    Signup,
    Userpage,
    Team,

  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Userpage,
    Signup,
    Team,
  ],
  providers: [
    HttpModule,
    AuthService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
