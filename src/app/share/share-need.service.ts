import { Injectable } from '@angular/core';
import { Groceries } from '../dashboard/requests/requests.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareNeedService {

  private _jsonURL = 'assets/data/userList.json'; 
  constructor(private http: HttpClient) { 
    this.allRequest = [];
    this.myRequest = [];
    this.closedRequest = [];
  }
  allRequest: Groceries[]
  myRequest: Groceries[]
  closedRequest: Groceries[]
  public getUserList(): Observable<any> {
     return this.http.get(this._jsonURL);
   }
}
