import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Battle } from '../../models/models';
import { BattlesService } from '../../providers/battles-service';

/*
  Generated class for the Bet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-makeBet',
  templateUrl: 'makeBet.html'
})
export class MakeBetPage {
public eventId;
  constructor(public navCtrl: NavController, public params:NavParams, private alertCtrl: AlertController) {
  	this.eventId = params.data;
  }

  presentConfirm(trainer) {
  let alert = this.alertCtrl.create({
    title: 'Confirm bet',
    message: `You really want to bet on trainer${trainer}`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('bet canceled');
        }
      },
      {
        text: 'Accept',
        handler: () => {
          console.log('bet accepted');
        }
      }
    ]
  });

  alert.present();
  }

  ionViewDidLoad() {
    console.log(this.eventId);
  }

}
