import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApplicationEnvironment provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApplicationEnvironment {
  private endpoint: string = '';
  private config: any = {
    endpoint: {
      relative: '/',
      absolute: 'https://dev1.apricotdev.io/'
    },
    lambda: {
      url: 'https://ko1zm88tk8.execute-api.us-east-1.amazonaws.com/prod/versionFunction',
      key: 'VBOvIyemcA70s4cOfpBTg33joBEYeS1taqSMTOPS'
    }
  };

  constructor(public platform: Platform, public http: Http) {
    // TODO: Load config from a json file
    // TODO: Allow dev menu to switch endpoints at runtime
    if (this.platform.is('cordova')) {
      this.endpoint = this.config.endpoint.absolute;
    }
    else {
      this.endpoint = this.config.endpoint.relative;
    }
  }

  public getEndpoint() {
    return this.endpoint;
  }

  public setEndpoint(endpoint: string = '') {
    this.endpoint = endpoint;
  }

  public getLambdaEndpoint() {
    return this.endpoint;
  }

}
