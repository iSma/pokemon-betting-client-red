import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MasterService } from '../../providers/master-service';
import { Battle, Bet} from '../../models/models'

/*
  Generated class for the Battle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-battle',
  templateUrl: 'battle.html',
  providers: [MasterService]
})
export class BattlePage {
  public bets: Bet[];
  public battle: Battle;

  constructor(public navCtrl: NavController,public params:NavParams,public masterService: MasterService) {
  	this.battle = params.data;
    this.load();
  }

  load() {
     this.masterService.loadBetsOfBattle(this.battle.id)
     .subscribe((data) => { this.bets = data });
  }

  ionViewDidLoad() {
    console.log(this.battle);
  }

}
