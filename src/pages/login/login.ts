import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';


import { MasterService } from '../../providers/master-service';

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
  public mail;

  constructor(public navCtrl: NavController, public masterService: MasterService, private alertCtrl: AlertController) {

  }

  signUp() {
    if (this.login.name == "" || this.login.pass == " " || this.mail == undefined){
      return console.error("please full the form");
    }
    else {
      let newAcount = {
        name: this.login.name,
        mail: this.mail,
        pass: this.login.pass
      };
      console.log("name: "+this.login.name+" pass: "+this.login.pass+" mail: "+this.mail);
      this.masterService.postUser(newAcount).then( any => {
        this.logForm();
      });
    }

  }

  logForm() {
    this.masterService.postLogin(this.login).then( done =>  {
      if (done == 'success') {
        console.log('ok');
         this.navCtrl.pop();
      } else {
        this.showAlert();
        console.log(done);
      }
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login Error',
      subTitle: 'error in login data, try again',
      buttons: ['OK']
    });
    alert.present();
  }


}
