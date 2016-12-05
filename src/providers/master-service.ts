import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { NavController} from 'ionic-angular';

import { Battle, Bet, Login, Account} from '../models/models';
import { HomePage } from '../pages/home/home'


const API = 'http://localhost:3000';
const HEAD = new Headers({'Content-Type': 'application/json'});

@Injectable()
export class MasterService {
  constructor(public http : Http, public storage : Storage, public navCtrl : NavController) {
    console.log('Hello BattlesService Provider');
  }

  setToken(token:String){
    this.storage.set('token',token)
  }

  getToken(): Promise<String>{
    return this.storage.get('token')
    .then((t) => {
      return t;
    })
  }

  loadBattle(): Observable<Battle[]> {
    return this.http.get(`${API}/battles`)
    .map(res => res.json())
    .catch(this.handleError);
  }

  loadBetsOfBattle(eventId): Observable<Bet[]>{
    return this.http.get(`${API}/battles/${eventId}/bets`)
    .map(res => res.json())
    .catch(this.handleError);
  }

  postLogin(login){
    let body = JSON.stringify(login);
    return this.http.post(`${API}/login`, body)
    .toPromise()
    .then(data => {
      this.setToken(data['_body']);
      this.getToken().then(t => console.log(t));
      console.log('request new token');
      setTimeout(() => this.refreshToken(), 240000);
      return 'success';
    })
    .catch(error => error);
  }

  postUser(newAccount: Account){
    let body = JSON.stringify(newAccount);
    return this.http.post(`${API}/users`, body)
    .toPromise()
    .then( (value:any) => {
      console.log(newAccount);
      return 'sucess';
    })
    .catch(error => error);

  }

  refreshToken(){
    console.log("refresh token")
    this.getToken().then(t => {
      let oldtoken = t;
      console.log('old: '+oldtoken);
      this.http.get(`${API}/login?token=${oldtoken}`)
      .catch(this.handleError)
      .toPromise()
      .then( data =>{
        this.setToken(data._body);
        setTimeout(() => this.refreshToken(), 240000);
        console.log("new: "+data._body)
      })
     })

  }

  private handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
