import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MasterService } from '../../providers/master-service';
import { Login, Account, Bet} from '../../models/models';

/*
  Generated class for the User page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
  providers: [MasterService]
})
export class UserPage {
  public login:Login;
  public amount:number;
  public token;
  public balance;
  public aBets: Bet[];
  public fBets: Bet[];

  constructor(public navCtrl: NavController, public masterService: MasterService) {
    this.load();
    this.aBets = [];
    this.fBets = [];
    this.balance = 0;
  }


  addMoney(){
    this.masterService.postTransaction({amount:this.amount}).then(
      r => {
      console.log(r);
      this.amount = 0;
      this.masterService.getBalance().then(b => {this.balance = b.balance});
    })
  }

  load(){
    this.masterService.getLogin().then(l => this.login = l).then( any => {
      this.masterService.getToken().then(t => this.token = t);
      this.masterService.getBalance().then(b => {console.log(b.balance); this.balance = b.balance});
      this.getBets();
    });
  }

  logout(){
    console.log("logout");
    this.masterService.rmLogin();
    this.navCtrl.pop();
  }

  getBets(){
    console.log(this.login);
    this.masterService.loadBet('active')
      .subscribe((data) => this.aBets = data.filter(b => b.user == this.login.id));
    this.masterService.loadBet('ended')
      .subscribe((data) => this.fBets = data.filter(b => b.user == this.login.id));
  }

  getType(p){
    if(p) return "bet";
    else return "battle";
  }

  getResult(w){
    if (w) return 'win';
    else return 'loose';
  }

  ionViewDidLoad() {
    console.log('Hello User Page');
  }

}
