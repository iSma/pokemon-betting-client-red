import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Battle } from '../../models/battle';
import { BattlesService } from '../../providers/battles-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public battles: Battle[];

  constructor(public navCtrl: NavController, public battlesService: BattlesService) {
  	this.load();
  }

  load() {
    this.battlesService.load()
    .subscribe((data) => {
    	this.battles = data
    	console.log(data);
    });

  }
}