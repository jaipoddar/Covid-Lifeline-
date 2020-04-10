import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {switchMap} from 'rxjs/operators';
import { Tasks } from 'src/app/share/tasks.enum';
export interface PeriodicElement {
  priority: string;
  description: string;
  expireOn: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {priority: 'Critical', description: 'Mobile charger',expireOn:'12-03-2020'},
  {priority: 'Normal', description: 'Aata',expireOn:'20-06-2020'},
  {priority: 'Critical', description: 'Soap',expireOn:'15-12-2020'},
  {priority: 'Normal', description: 'Pulse',expireOn:'10-11-2020'},
  {priority: 'Critical', description: 'Soyabean',expireOn:'19-09-2020'},
  {priority: 'Normal', description: 'Water',expireOn:'13-06-2020'},
  {priority: 'Critical', description: 'Laptop',expireOn:'3-03-2020'},
  {priority: 'Normal', description: 'Rice',expireOn:'25-02-2020'},
  {priority: 'Normal', description: 'Floor',expireOn:'17-04-2020'},
  {priority: 'Critical', description: 'Corn',expireOn:'27-03-2020'},
  {priority: 'Normal', description: 'Fruits',expireOn:'12-02-2020'}
];

/**
 * @title Table with selection
 */
@Component({
  selector: 'share-need-next-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  constructor(public toastController: ToastController, private route: ActivatedRoute) {
  }
  status = Tasks[Tasks["All Request"]];  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.status =  Tasks[params.get('id')];      
    });
  }
  displayedColumns: string[] = ['select', 'priority', 'description','expireOn'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.priority + 1}`;
  }
}









