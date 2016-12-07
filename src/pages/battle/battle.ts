import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { MasterService } from '../../providers/master-service';
import { Battle, Bet, Trainer, Pokemon} from '../../models/models'
import { MakeBetPage } from '../makeBet/makeBet';

import moment from 'moment'

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
  public pokemons: Pokemon[];
  public makeBetPage = MakeBetPage;


  constructor(public navCtrl: NavController,public params:NavParams, public masterService:MasterService, public events: Events, public alertCtrl: AlertController) {
  	this.battle = params.data.battle;
    this.trainers = params.data.trainers;
    this.bets = [];
    this.load();
  }

  load() {
    this.masterService.getPokemons()
      .subscribe((data) => this.pokemons = data);
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

  getLocalTime(time) {
    return moment(new Date(time)).fromNow();
  }

  getType(p){
    if(p) return "bet";
    else return "battle";
  }

  getPokemon(id){return this.pokemons.find(p => p.id == id)}

  alertPokInfo(id){
    let pokemon = this.getPokemon(id);

    let alert = this.alertCtrl.create({
      title: pokemon.name,
      subTitle: ` <b>hp: </b>${pokemon.hp} <br>
                  <b>atk: </b>${pokemon.atk} <br>
                  <b>def: </b>${pokemon.def} <br>
                  <b>speed: </b>${pokemon.speed} <br>`,
      buttons: ['OK']
    });
    alert.present();
  }


}
