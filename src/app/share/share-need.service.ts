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
    this.closedRequest = [];
    this.joinGroup = [];
  }
  allRequest: Groceries[];
  myRequest: Groceries[];
  closedRequest: Groceries[];
  joinGroup: Groups[];
}
