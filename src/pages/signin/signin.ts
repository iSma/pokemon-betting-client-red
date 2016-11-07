import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class Signin {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Signin Page');
  }

}
