import { Component, OnInit } from '@angular/core';
import { ShareNeedService } from '../share/share-need.service';

@Component({
  selector: 'share-need-next-creategroup',
  templateUrl: './creategroup.page.html',
  styleUrls: ['./creategroup.page.scss'],
})
export class CreategroupPage  {

  constructor(public shareNeedService:ShareNeedService) { 

  } 

}
