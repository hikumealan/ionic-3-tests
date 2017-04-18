import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PreAuthPage } from '../pages/pre-auth/pre-auth';
import { PostAuthPage } from '../pages/post-auth/post-auth';
import { ApplicationVersion } from '../providers/application-version';
import { ApplicationEnvironment } from '../providers/application-environment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  environment: string = '';
  version: string = '';
  rootPage: any = PreAuthPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public applicationVersion: ApplicationVersion,
    public applicationEnvironment: ApplicationEnvironment,
    public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Pre Auth', component: PreAuthPage },
      { title: 'Post Auth', component: PostAuthPage }
    ];

    this.environment = this.applicationEnvironment.getEndpoint();
    this.version = this.applicationVersion.getAppVersion();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
