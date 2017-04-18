import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { PreAuthPage } from '../pages/pre-auth/pre-auth';
import { PostAuthPage } from '../pages/post-auth/post-auth';
import { ApplicationEnvironment } from '../providers/application-environment';
import { ApplicationVersion } from '../providers/application-version';


@NgModule({
  declarations: [
    MyApp,
    PreAuthPage,
    PostAuthPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PreAuthPage,
    PostAuthPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApplicationEnvironment,
    ApplicationVersion,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
