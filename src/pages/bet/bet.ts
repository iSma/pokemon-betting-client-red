import { Component } from '@angular/core';
import { NavController, NavParams, Events} from 'ionic-angular';
import { Bet, UserStat} from '../../models/models'
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
  public pBet: Bet;
  public userStat: UserStat;
  constructor(public navCtrl: NavController, public params:NavParams, public masterService:MasterService,  public events: Events,) {
    this.pBet = params.data.pBet;
    this.load();
    this.getUName(this.pBet.user);
    this.masterService.getStats('users',this.pBet.user)
      .then(stat =>{
        this.userStat = stat;
      });
    this.events.subscribe('reloadBattlePage',() => {
       this.load();
    })
  }

  ionViewDidLoad() {
    console.log('Hello Bet Page');
  }

  load(){
     this.masterService.loadBetsOfBet(this.pBet.id)
    .subscribe(data => {
      this.bets = data;
    });
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

  getUName(id){
    this.masterService.getUserName(id)
      .then(u => this.pBet.username = u.name);
  }

  getWinRatio(w, t){
    if(t != 0){
    return`win ratio ${Math.round(w/t*100)}%`;
    } else return " ";
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
