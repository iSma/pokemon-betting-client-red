import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController, LoadingController } from 'ionic-angular';
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
  public trainersStats;
  public pokemons: Pokemon[];
  public makeBetPage = MakeBetPage;
  public betPage = BetPage;
  public winrate;


  constructor( public navCtrl: NavController,public params:NavParams,
               public masterService:MasterService, public events: Events,
               public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  	this.battle = params.data.battle;
    this.trainers = params.data.trainers;
    this.bets = [];
    this.trainersStats = [];
    this.load();
    this.events.subscribe('reloadBattlePage',() => {
       this.load();
    })
  }

  load() {
    this.masterService.getPokemons()
      .subscribe((data) => this.pokemons = data);
     this.masterService.loadBetsOfBattle(this.battle.id)
     .subscribe((data) => { this.bets = data });
     if (this.trainersStats.length == 0)
     this.trainers.forEach(t => {
       this.masterService.getStats("trainers", t.id)
       .then(stat => this.trainersStats.push(stat));
     });
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

  getPokemon(id){
    return this.pokemons.find(p => p.id == id)
  }

  alertPokInfo(id){
    let pokemon = this.getPokemon(id);
    let stat;
    this.masterService.getStats('pokemons',id)
      .then(s => {
      stat = s;
      let winRatio = Math.round(stat.battles.won/stat.battles.total*100);

    let alert = this.alertCtrl.create({
      title: `<b> Pokemon: </b> ${pokemon.name}`,
      subTitle: ` <b>hp: </b>${pokemon.hp} <br>
                  <b>atk: </b>${pokemon.atk} <br>
                  <b>def: </b>${pokemon.def} <br>
                  <b>speed: </b>${pokemon.speed} <br>
                  <b>win: </b> ${winRatio}% of ${stat.battles.total} `,
      buttons: ['OK']
    });
    alert.present();
   })
  }

  alertTrainerInfo(i){
    if(this.trainersStats.length == 2){
      let stat = this.trainersStats[i];
      let trainer = this.trainers[i];
      let winrate= Math.round(stat.battles.won/stat.battles.total*100);
      let alert = this.alertCtrl.create({
        title: `<b>Trainer: </b> ${trainer.name}`,
        subTitle: ` <b>origin: </b>${trainer.country} <br>
                    <b>gender: </b>${trainer.gender} <br>
                    <b> wins: </b>${winrate}% of ${stat.battles.total}<br>`,
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 1000
      });
      loader.present();
      setTimeout(() => this.alertTrainerInfo(i),1000);
    }
  }


}
