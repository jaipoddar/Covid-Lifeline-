import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {switchMap} from 'rxjs/operators';
import { Tasks } from 'src/app/share/tasks.enum';
import { ShareNeedService } from 'src/app/share/share-need.service';
export interface Groceries {
  priority: string;
  description: string;
  expireOn: string;
  taskStatus: number;
}

const ELEMENT_DATA: Groceries[] = [];

/**
 * @title Table with selection
 */
@Component({
  selector: 'share-need-next-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  constructor(public toastController: ToastController, private route: ActivatedRoute, public shareNeedService: ShareNeedService) {
  }
  status = Tasks[Tasks["All Requests"]];
  taskId = Tasks["All Requests"];
  displayedColumns: string[] = ['select', 'priority', 'description','expireOn'];
  dataSource = new MatTableDataSource<Groceries>(ELEMENT_DATA);
  selection = new SelectionModel<Groceries>(true, []);
  ngOnInit() {
    console.log(this.shareNeedService);
    this.route.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.taskId = id;
      this.status =  Tasks[id];
      switch (id) {
        case 1:     
        this.dataSource = new MatTableDataSource<Groceries>(this.shareNeedService.myRequest);     
          break;
          case 2:     
          this.dataSource = new MatTableDataSource<Groceries>(this.shareNeedService.allRequest);     
            break;
            case 3:   
            this.dataSource = new MatTableDataSource<Groceries>(this.shareNeedService.closedRequest);       
              break;      
        default:
          this.dataSource = new MatTableDataSource<Groceries>(this.shareNeedService.allRequest);
          break;
      }
      
      this.selection = new SelectionModel<Groceries>(true, []);   
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Groceries): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.priority + 1}`;
  }
}









