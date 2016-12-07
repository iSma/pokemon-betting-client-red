import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { MasterService } from '../../providers/master-service';


import { Battle } from '../../models/models';
import { BattlesService } from '../../providers/battles-service';

/*
  Generated class for the Bet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-makeBet',
  templateUrl: 'makeBet.html',
  providers: [MasterService]
})
export class MakeBetPage {
public eventId;
public eventType;
public bet = {
  choice:0,
  amount:0
};
  constructor(public navCtrl: NavController, public params:NavParams, private alertCtrl: AlertController, public masterService: MasterService, public events: Events) {
  	this.eventId = params.data.event.id;
    this.eventType = params.data.type;
  }

  logForm(text) {
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
          this.masterService.postBet(this.eventType,this.eventId,this.bet)
          .then(rep =>  {
            console.log(rep);
            this.events.publish('reloadBattlePage');
            this.navCtrl.pop();
          })
          .catch(err => console.error(err));
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
