// import { AppVersion } from '@ionic-native/app-version';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApplicationVersion provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApplicationVersion {
  /* AUTOGENERATED: DO NOT MODIFY */
  private VERSION: string = '0.1.0-SNAPSHOT';
  /* AUTOGENERATED: DO NOT MODIFY */

  constructor(/*private appVersion: AppVersion*/) {
    // console.log(this.appVersion.getAppName());
    // console.log(this.appVersion.getPackageName());
    // console.log(this.appVersion.getVersionCode());
    // console.log(this.appVersion.getVersionNumber());
  }

  public getAppVersion() {
    return this.VERSION;
  }
}