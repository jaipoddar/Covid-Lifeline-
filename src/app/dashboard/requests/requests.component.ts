import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastController } from '@ionic/angular';
export interface PeriodicElement {
  requestNo: number;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {requestNo: 1, description: 'Hydrogen'},
  {requestNo: 2, description: 'Helium'},
  {requestNo: 3, description: 'Lithium'},
  {requestNo: 4, description: 'Beryllium'},
  {requestNo: 5, description: 'Boron'},
  {requestNo: 6, description: 'Carbon'},
  {requestNo: 7, description: 'Nitrogen'},
  {requestNo: 8, description: 'Oxygen'},
  {requestNo: 9, description: 'Fluorine'},
  {requestNo: 10, description: 'Neon'},
  {requestNo: 11, description: 'Oxygen'}
];

/**
 * @title Table with selection
 */
@Component({
  selector: 'share-need-next-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent {
  constructor(public toastController: ToastController){
    
  }
  displayedColumns: string[] = ['select', 'requestNo', 'description'];
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.requestNo + 1}`;
  }
}








