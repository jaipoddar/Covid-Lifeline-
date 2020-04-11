import { Injectable } from '@angular/core';
import { Groceries } from '../dashboard/requests/requests.component';
import { Groups } from '../joingroup/joingroup.page';


@Injectable({
  providedIn: 'root'
})
export class ShareNeedService {

  constructor() { 
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
}
