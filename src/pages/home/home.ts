import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Battle, Trainer} from '../../models/models';
import { MasterService } from '../../providers/master-service';

import { MakeBetPage } from '../makeBet/makeBet';
import { BattlePage } from '../battle/battle';
import { LoginPage } from '../login/login';

import moment from 'moment'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MasterService]
})

export class HomePage {
  public battles: Battle[];
  public trainers: Trainer[];
  public loadingDone: boolean;
  public n;

  public makeBetPage = MakeBetPage;
  public loginPage = LoginPage;

  constructor(public navCtrl: NavController, public masterService: MasterService) {
    this.loadingDone = false;
    this.load();
    this.n = 0;

  }

  load() {
    this.masterService.loadTrainer()
      .subscribe((data) => this.trainers = data);
    this.masterService.loadBattle()
      .subscribe((data) => this.battles = data);
  }

  getTrainer(id){
    return this.trainers.find(t => t.id == id);
  }

  toBattlePage(battle) {
    this.navCtrl.push(BattlePage,battle);
  };

  getLocalTime(time) {
    return moment(new Date(time)).fromNow();
  }
}
