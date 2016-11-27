import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Battle } from '../../models/models';
import { MasterService } from '../../providers/master-service';
import { MakeBetPage } from '../makeBet/makeBet';
import { BattlePage } from '../battle/battle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MasterService]
})

export class HomePage {
  public battles: Battle[];
  public makeBetPage = MakeBetPage;

  constructor(public navCtrl: NavController, public masterService: MasterService) {
  	this.load();
  }

  load() {
     this.masterService.loadBattle()
     .subscribe((data) => { this.battles = data });
  }

  toBattlePage(battle) {this.navCtrl.push(BattlePage,battle)};
}
