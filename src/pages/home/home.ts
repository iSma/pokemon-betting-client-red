import { Component } from '@angular/core';

import { NavController, Events } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public masterService: MasterService, public evt: Events) {
    this.load();
    this.evt.subscribe('reloadBattlePage', () => this.load());
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
    if (this.masterService.isLogged()){
        this.navCtrl.push(this.userPage);
      } else {
        this.navCtrl.push(this.loginPage);
      }
  }

  refreshBattle(){
    setTimeout(() => {
      this.load();
    }, 60000);
  }

  getLocalTime(b:Battle) {
    return moment(new Date(b.startTime)).fromNow();
  }

}
