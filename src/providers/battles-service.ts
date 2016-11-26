import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Battle } from '../models/battle';

const API = 'http://86.119.36.241:3000/';
const HEAD = new Headers({
  'Content-Type': 'application/json'
//  'Access-Control-Allow-Origin': '*'
});

@Injectable()
export class BattlesService {
  constructor(public http: Http) {
    console.log('Hello BattlesService Provider');
  }

  load(): Observable<Battle[]> {
    return this.http.get(`${API}/battles`, {headers: HEAD})
      .map(res => {
        console.log(res);
      })
     /* .map(res => res.json().map(
         res => {
           let b = new Battle();
           b.id = res.id;

           return b;
        }
      ))*/
      .catch(this.handleError);
  }

  private handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}