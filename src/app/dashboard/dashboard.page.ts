import { Component, OnInit } from '@angular/core';
import { ShareNeedService } from '../share/share-need.service';
import { applicationTitle } from '../share/constant';
import { Groceries, User } from './requests/requests.component';
import { Tasks } from '../share/tasks.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public shareNeedService: ShareNeedService) { }
  myRequests: Groceries[] = new Array<Groceries>();
  openRequests: Groceries[] = new Array<Groceries>();
  myTasks: Groceries[] = new Array<Groceries>();
  allRequest: Groceries[] = new Array<Groceries>();
  user = new User();
  ngOnInit() {    
    this.user = JSON.parse(localStorage.getItem('userDetails'));
    this.allRequest = JSON.parse(localStorage.getItem('allRequest'));    
    this.myRequests = this.allRequest.filter(x => x.user.name == this.user.name && x.taskStatus == Tasks["My Requests"]);    
    this.openRequests = this.allRequest.filter(x => x.user.name != this.user.name && x.taskStatus == Tasks["Open Requests"]);    
    this.myTasks = this.allRequest.filter(x => x.user.name == this.user.name && x.taskStatus == Tasks["My Tasks"]);    
  }

  setDatasource(id: number) {
    // this.allRequest = JSON.parse(localStorage.getItem('allRequest'));
    // this.user = JSON.parse(localStorage.getItem('userDetails'));
    // switch (id) {
    //   case 1:
    //     this.dataSource = new MatTableDataSource<Groceries>(this.allRequest.filter(x => x.user.name == this.user.name));
    //     break;
    //   case 2:
    //     this.dataSource = new MatTableDataSource<Groceries>(this.allRequest.filter(x => x.user.name == this.user.name));
    //     break;
    //   case 3:
    //     this.dataSource = new MatTableDataSource<Groceries>(this.allRequest.filter(x => x.user.name == this.user.name));
    //     break;
    //   default:
    //     this.dataSource = null;
    //     break;
    // }

    // this.selection = new SelectionModel<Groceries>(true, []);
  }

}
