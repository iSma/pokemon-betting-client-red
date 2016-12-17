import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Battle, Trainer} from '../../models/models';
import { MasterService } from '../../providers/master-service';

import { MakeBetPage } from '../makeBet/makeBet';
import { BattlePage } from '../battle/battle';
import { LoginPage } from '../login/login';
import { UserPage } from '../user/user';

import moment from 'moment'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MasterService]
})

export class HomePage {
  public battles: Battle[];
  public trainers: Trainer[];

  public makeBetPage = MakeBetPage;
  public loginPage = LoginPage;
  public userPage = UserPage;

  constructor(public navCtrl: NavController, public masterService: MasterService) {
    this.load();
  }

  load() {
    this.masterService.loadTrainer()
      .subscribe((data) => this.trainers = data);
    this.masterService.loadBattle()
      .subscribe((data) => this.battles = data);
    this.refreshBattle();
  }

  getTrainer(id){
    return this.trainers.find(t => t.id == id);
  }

  toBattlePage(battle: Battle) {
    this.navCtrl.push(BattlePage,{battle: battle,trainers: [this.getTrainer(battle.teams['1'].trainer), this.getTrainer(battle.teams['2'].trainer)]});
  };

  toLogOrUserPage(){
    console.log('click');
    if (this.masterService.isLogged()){
      console.log("goto user page");
        this.navCtrl.push(this.userPage);
      } else {
        this.navCtrl.push(this.loginPage);
      }
  }

  refreshBattle(){
    this.masterService.loadBattle()
      .subscribe((data) => this.battles = data);
    setTimeout(() => {
      console.log('refresh battle list');
      this.refreshBattle();
    }, 60000);
  }

  getLocalTime(b:Battle) {
    return moment(new Date(b.startTime)).fromNow();
  }

}
