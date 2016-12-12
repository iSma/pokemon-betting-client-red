import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Bet} from '../../models/models'
import { MasterService } from '../../providers/master-service';
import { MakeBetPage } from '../makeBet/makeBet';


/*
  Generated class for the Bet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bet',
  templateUrl: 'bet.html',
  providers: [MasterService]
})
export class BetPage {
  public bets: Bet[];
  public makeBetPage = MakeBetPage;
  public betPage = BetPage;

  constructor(public navCtrl: NavController, public params:NavParams, public masterService:MasterService) {
    this.bets = params.data.bets;
  }

  ionViewDidLoad() {
    console.log('Hello Bet Page');
  }


//ghetto

  getChildBet(aBet:Bet){
    if (!aBet.childs){
    this.masterService.loadBetsOfBet(aBet.id)
    .subscribe(data => {
      aBet.childs = data;
    })
   }
  }

  getType(p){
    this.getChildBet(p);
    if(p.parent) return "bet";
    else return "battle";
  }

  hasChild(b){
    return b.childs.length > 0;
  }
}
