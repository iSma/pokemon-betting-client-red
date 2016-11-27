import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Battle, Bet } from '../models/models';

const API = 'http://localhost:3000';

@Injectable()
export class MasterService {
  constructor(public http: Http) {
    console.log('Hello BattlesService Provider');
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

  private handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
