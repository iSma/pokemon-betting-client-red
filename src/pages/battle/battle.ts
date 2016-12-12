import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { MasterService } from '../../providers/master-service';
import { Battle, Bet, Trainer, Pokemon} from '../../models/models'
import { MakeBetPage } from '../makeBet/makeBet';
import { BetPage } from '../bet/bet'

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
  public betPage = BetPage;
  public winrate;


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

  getChildBet(aBet:Bet){
    if (!aBet.childs){
    this.masterService.loadBetsOfBet(aBet.id)
    .subscribe(data => {
      aBet.childs = data;
    })
   }
  }

  ionViewDidLoad() {
    console.log("battle page");
  }

  getLocalTime(time) {
    return moment(new Date(time)).fromNow();
  }

  getType(p){
    this.getChildBet(p);
    if(p.parent) return "bet";
    else return "battle";
  }

  hasChild(b){
    return b.childs.length > 0;
  }

  getPokemon(id){return this.pokemons.find(p => p.id == id)}

  alertPokInfo(id){
    let pokemon = this.getPokemon(id);

    let alert = this.alertCtrl.create({
      title: `<b> Pokemon: </b> ${pokemon.name}`,
      subTitle: ` <b>hp: </b>${pokemon.hp} <br>
                  <b>atk: </b>${pokemon.atk} <br>
                  <b>def: </b>${pokemon.def} <br>
                  <b>speed: </b>${pokemon.speed} <br>`,
      buttons: ['OK']
    });
    alert.present();
  }

  alertTrainerInfo(trainer){
    this.masterService.getTrainerStat(trainer.id).then( stat => {
      console.log(stat);
      let winrate= Math.round(stat.battles.won/stat.battles.total*100);
      let alert = this.alertCtrl.create({
        title: `<b>Trainer: </b> ${trainer.name}`,
        subTitle: ` <b>origin: </b>${trainer.country} <br>
                    <b>gender: </b>${trainer.gender} <br>
                    <b>Win ratio: </b>${winrate}%<br>`,
        buttons: ['OK']
      });
      alert.present();
   })
  }


}
