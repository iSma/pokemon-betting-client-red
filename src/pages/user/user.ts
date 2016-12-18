import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MasterService } from '../../providers/master-service';
import { Login, Bet, Transaction} from '../../models/models';

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
  public transactions: Transaction[];
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
      this.masterService.getToken().then(t => this.token = t).then( any => {
        this.getBets();
        this.masterService.loadTransaction(this.login.id, this.token).
          subscribe(data => this.transactions = data)});
        this.masterService.getBalance().then(b => {console.log(b.balance); this.balance = b.balance});
    });
  }

  logout(){
    console.log("logout");
    this.masterService.rmLogin();
    this.navCtrl.pop();
  }

  getBets(){
    console.log(this.token);
    this.masterService.loadBetOfUser(this.login.id, this.token, 'active')
      .subscribe((data) => this.aBets = data.sort(d => d.battle));
    this.masterService.loadBetOfUser(this.login.id, this.token, 'ended')
      .subscribe((data) => this.fBets = data.sort(d => d.battle));
  }

  getIncome(bet){
    let deposit = this.transactions.find(t => (t.type == 'bet' && t.bet == bet.id));
    if (bet.choice != bet.result ) return deposit.amount;
    let income = this.transactions.find(t => (t.type == 'win' && t.bet == bet.id));
    return `+${income.amount}`;

  }

  getInitialBattle(b){
    if (b.parent == null) return " ";
    return `// root battle: #${b.battle}`;
  }

  getType(p){
    if(p) return "bet";
    else return "battle";
  }

  getResult(w){
    if (w.choice == w.result) return 'checkmark';
    else return 'close';
  }

  ionViewDidLoad() {
    console.log('Hello User Page');
  }

}
