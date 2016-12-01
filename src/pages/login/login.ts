import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';


import { MasterService } from '../../providers/master-service';
import { Login } from '../../models/models';
import { HomePage } from '../home/home'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [MasterService]
})
export class LoginPage {
  public login = {
    name:"",
    pass:""
  };

  constructor(public navCtrl: NavController, public masterService: MasterService, private alertCtrl: AlertController) {

  }

  logForm() {
    this.masterService.postLogin(this.login);
  }


}
