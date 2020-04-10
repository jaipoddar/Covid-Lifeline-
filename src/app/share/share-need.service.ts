import { Injectable } from '@angular/core';
import { Groceries } from '../dashboard/requests/requests.component';

@Injectable({
  providedIn: 'root'
})
export class ShareNeedService {

  constructor() { 
    this.allRequest = [];
    this.myRequest = [];
    this.closedRequest = [];
  }
  allRequest: Groceries[]
  myRequest: Groceries[]
  closedRequest: Groceries[]
}
