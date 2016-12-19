import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { MasterService } from '../../providers/master-service';

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
public choices;
public eventId;
public eventType;
public odds: number[];
public bet = {
  choice:0,
  amount:0
};
public choice;
  constructor(public navCtrl: NavController, public params:NavParams, private alertCtrl: AlertController, public masterService: MasterService, public events: Events) {
  	this.eventId = params.data.event.id;
    this.eventType = params.data.type;
    this.choices = params.data.choices;
    this.masterService.getOdd(this.eventType, this.eventId).then(odds => {
      this.odds = odds;
      console.log(odds);
      });
  }

  logForm(text) {
  let alert = this.alertCtrl.create({
    title: 'Confirm bet',
    message: `You really want to bet ${this.bet.amount} on ${this.choices[this.bet.choice-1]} ?`,
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
          .catch(err => {
            console.error(err);
            this.errorAlert(err);
            });
        }
      }
    ]
  });
  alert.present();
  }

  errorAlert(err){
    let alert = this.alertCtrl.create({
      title: 'Something went wrong',
      subTitle: `${err.status}: ${err.statusText}`,
      buttons: ['OK']
    });
    alert.present();
  }

  getOdds(id, a){
    let r = parseInt(a)/(this.odds[id-1] + parseInt(a));

    let w = (this.odds[0] + this.odds[1]  + parseInt(a)) * r;
    if (isNaN(w)) return 0;
    return Math.round(w*100)/100;
  }

  ionViewDidLoad() {
    console.log(this.eventId);
  }

}
