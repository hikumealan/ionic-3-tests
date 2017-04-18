import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the PreAuth page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pre-auth',
  templateUrl: 'pre-auth.html'
})
export class PreAuthPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    // TODO: Call the Logout Event
    console.log('ionViewDidLoad PreAuthPage');
  }

}
