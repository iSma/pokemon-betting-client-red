import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MasterService } from '../../providers/master-service';
import { Login, Account} from '../../models/models';

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
  constructor(public navCtrl: NavController, public masterService: MasterService) {
    this.load();
  }


  addMoney(){
    this.masterService.postTransaction({amount:this.amount}).then(
      r => {
      console.log(r);
      this.amount = 0;
      this.balance = r.balance;
    })
  }

  load(){
    this.masterService.getLogin().then(l => this.login = l);
    this.masterService.getToken().then(t => this.token = t);
    this.masterService.getBalance().then(b => {console.log(b.balance); this.balance = b.balance});
  }



  ionViewDidLoad() {
    console.log('Hello User Page');
  }

}
