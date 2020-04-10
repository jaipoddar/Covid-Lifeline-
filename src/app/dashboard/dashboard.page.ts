import { Component, OnInit } from '@angular/core';
import { ShareNeedService } from '../share/share-need.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public shareNeedService: ShareNeedService) { }

  ngOnInit() {
  }

}
