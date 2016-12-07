import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { NavController} from 'ionic-angular';
import jwtDecode from 'jwt-decode';

import { Battle, Bet, Login, Account, Trainer} from '../models/models';
import { HomePage } from '../pages/home/home'


const API = 'http://localhost:3000';
const HEAD = new Headers({'Content-Type': 'application/json'});

@Injectable()
export class MasterService {
  public static ISLOGGED;
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

  getLogin(): Promise<Login>{
    return this.storage.get('login').then(t => t);
  }

  rmLogin(){
    this.storage.clear();
    MasterService.ISLOGGED = false;
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

  loadTrainer(): Observable<Trainer[]>{
    return this.http.get(`${API}/trainers`)
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
      MasterService.ISLOGGED = true;
      this.storage.set('login',login);
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

  postBet(type, id, choice){
    let body = JSON.stringify(choice);
    return this.getToken().then(t =>{
      return this.http.post(`${API}/${type}/${id}/bets?token=${t}`, body)
      .toPromise()
      .then(resp => resp.json())
    })
  }

  postTransaction(amount){
    let body = JSON.stringify(amount);
    console.log(body);
    return this.getToken().then(t =>{
      let decoded = jwtDecode(t);
      let id = decoded.sub;
      console.log(decoded);
      return this.http.post(`${API}/users/${id}/transactions?token=${t}`, body)
      .toPromise()
      .catch(error => error)
      .then(resp => resp.json())
    })
  }

  getBalance(){
    return this.getToken().then(t =>{
      let decoded = jwtDecode(t);
      let id = decoded.sub;
      console.log(decoded);
      return this.http.get(`${API}/users/${id}/balance?token=${t}`)
      .toPromise()
      .catch(error => error)
      .then(resp => resp.json())
    })
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

  isLogged(){
    return MasterService.ISLOGGED;
  }

  private handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
