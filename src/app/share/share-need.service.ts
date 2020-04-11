import { Injectable } from '@angular/core';
import { Groceries } from '../dashboard/requests/requests.component';
import { Groups } from '../joingroup/joingroup.page';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShareNeedService {
  private _jsonURL = 'assets/data/userList.json';
  constructor( private http: HttpClient) { 
    this.allRequest = [];
    this.myRequest = [];
    this.myTasks = [];
    this.joinGroup = [];
    this.applicationTitle = 'Covid-19-Lifline';
  }
  applicationTitle = 'Covid-19-Lifline';
  allRequest: Groceries[];
  myRequest: Groceries[];
  myTasks: Groceries[];
  joinGroup: Groups[];
 
 public getUserList(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
}
