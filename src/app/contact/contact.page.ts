import { Component, OnInit } from '@angular/core';
import { ShareNeedService } from '../share/share-need.service';

@Component({
  selector: 'share-need-next-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(public shareNeedService: ShareNeedService) { }

  ngOnInit() {
  }

}
