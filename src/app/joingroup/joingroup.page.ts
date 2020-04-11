import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {switchMap} from 'rxjs/operators';
import { Tasks } from 'src/app/share/tasks.enum';
import { ShareNeedService } from 'src/app/share/share-need.service';
import { HttpClient } from '@angular/common/http';

const groupDataPath = 'assets/data/join-group.json';
export interface Groups {
  groupName: string;
  shortAddress: string;
}

/**
 * @title Table with selection
 */
@Component({
  selector: 'share-need-next-joingroup',
  templateUrl: './joingroup.page.html',
  styleUrls: ['./joingroup.page.scss'],
})
export class JoinGroupPage implements OnInit {
  constructor(public toastController: ToastController,
              public shareNeedService: ShareNeedService,
              private httpClient: HttpClient) {
  }

  displayedColumns: string[] = ['select', 'groupName', 'shortAddress'];
  dataSource = new MatTableDataSource<Groups>();
  selection = new SelectionModel<Groups>(true, []);
  selectedGroup = 'Paras Tierra';
  showGroups = false;

  ngOnInit() {
    console.log(this.shareNeedService);
    this.selection = new SelectionModel<Groups>(true, []);
    this.httpClient.get<Groups[]>(groupDataPath).subscribe( (data: Groups[]) => {
      if (data && data.length > 0) {
        this.shareNeedService.joinGroup = data;
        this.dataSource = new MatTableDataSource<Groups>(this.shareNeedService.joinGroup);
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      header: 'Accept',
      position: 'top',
      message: 'Completed Successfully !!',
      duration: 2000
    });
    toast.present();
  }
}









