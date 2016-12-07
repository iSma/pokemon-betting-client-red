import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { MasterService } from '../../providers/master-service';
import { Battle, Bet, Trainer} from '../../models/models'
import { MakeBetPage } from '../makeBet/makeBet';

/*
  Generated class for the Battle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  tes
*/
@Component({
  selector: 'page-battle',
  templateUrl: 'battle.html',
  providers: [MasterService]
})
export class BattlePage {
  public bets: Bet[];
  public battle: Battle;
  public trainers: Trainer[];
  public makeBetPage = MakeBetPage;


  constructor(public navCtrl: NavController,public params:NavParams, public masterService:MasterService, public events: Events) {
  	this.battle = params.data.battle;
    this.trainers = params.data.trainers;
    this.bets = [];
    this.load();
  }

  load() {
     this.masterService.loadBetsOfBattle(this.battle.id)
     .subscribe((data) => { this.bets = data });
     this.events.subscribe('reloadBattlePage',() => {
       this.load();
    })
  }

  isAnyBet(){
    return (this.bets.length > 0);
  }

  ionViewDidLoad() {
    console.log("battle page");
  }

}
