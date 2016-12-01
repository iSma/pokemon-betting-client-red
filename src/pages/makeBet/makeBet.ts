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
public bet = {
  choice:0,
  amount:0
};
  constructor(public navCtrl: NavController, public params:NavParams, private alertCtrl: AlertController) {
  	this.eventId = params.data;
  }

  logForm() {
  let alert = this.alertCtrl.create({
    title: 'Confirm bet',
    message: `You really want to bet ${this.bet.amount} on trainer${this.bet.choice}`,
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
          console.log(this.bet.amount);
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
