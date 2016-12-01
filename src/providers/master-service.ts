import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { NavController} from 'ionic-angular';

import { Battle, Bet, Login, Response} from '../models/models';
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

  postLogin(login: Login){
    let body = JSON.stringify(login);
    this.http.post(`${API}/login`, body)
    .catch(this.loginError)
    .subscribe(data => {
      this.setToken(data._body);
      this.getToken().then(t => console.log(t));
      setTimeout(() => this.refreshToken(), 240000);
      this.navCtrl.push(HomePage);;
    })
  }

  refreshToken(){
    console.log("refresh token")
    this.getToken().then(t => {
      let oldtoken = t;
      console.log('old: '+oldtoken);
      this.http.get(`${API}/login?token=${oldtoken}`)
      .catch(this.handleError)
      .subscribe( data =>{
        this.setToken(data['_body']);
        setTimeout(() => this.refreshToken(), 240000);
      })
     })

  }

  private handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  private loginError(error){
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
