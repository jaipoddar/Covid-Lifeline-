import { Component, OnInit } from '@angular/core';
import { ShareNeedService } from '../share/share-need.service';

@Component({
  selector: 'share-need-next-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(public shareNeedService: ShareNeedService) { }

  ngOnInit() {
  }

}
