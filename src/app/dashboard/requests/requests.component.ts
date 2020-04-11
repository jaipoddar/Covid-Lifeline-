import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { Tasks } from 'src/app/share/tasks.enum';
import { ShareNeedService } from 'src/app/share/share-need.service';
import { ApprovalModalComponent } from 'src/app/approval-modal/approval-modal.component';
export class Groceries {
  isCritical: boolean;
  details: string;
  validity: string;
  taskStatus: number;
  days: string;
  user: User = new User();
}
export class User {
  name: string;
  email: string;
  phone: string;
  societyName: string;
  address: string;
  lat: number;
  lng: number;
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
  constructor(private rou: Router, public modalController: ModalController, public toastController: ToastController, private route: ActivatedRoute, public shareNeedService: ShareNeedService) {
  }
  status = Tasks[Tasks["Open Requests"]];
  taskId = Tasks["Open Requests"];
  displayedColumns: string[] = ['select','isCritical', 'details', 'validity'];  
  selection = new SelectionModel<Groceries>(true, []);
  showGrid = true;
  myRequests: Groceries[] = new Array<Groceries>();
  openRequests: Groceries[] = new Array<Groceries>();
  myTasks: Groceries[] = new Array<Groceries>();
  allRequest: Groceries[] = new Array<Groceries>();
  user = new User();
  dataSource = new MatTableDataSource<Groceries>(ELEMENT_DATA);
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.taskId = id;
      this.status = Tasks[id];
      this.setDatasource(id);
    });
  }
  setDatasource(id: number) {
    this.allRequest = JSON.parse(localStorage.getItem('allRequest'));
    this.user = JSON.parse(localStorage.getItem('userDetails'));
    switch (id) {
      case 1:
        this.dataSource = new MatTableDataSource<Groceries>(this.shareNeedService.allRequest);
        break;
      case 2:
        this.dataSource = new MatTableDataSource<Groceries>(this.shareNeedService.allRequest);
        break;
      case 3:
        this.dataSource = new MatTableDataSource<Groceries>(this.shareNeedService.allRequest);
        break;
      default:
        this.dataSource = null;
        break;
    }
    if(this.dataSource && this.dataSource.data.length>0){
    this.dataSource.data.forEach( x => {
      x.days = 'Today';      
    });
    }
  }
  getDays(date:string): string{
    const date1:any = new Date();
    const date2:any = new Date(date);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)).toString(); 
    return diffDays== '1'?'Today':diffDays;    
  }
  async presentModal(element: Groceries) {
    this.showGrid = false;
    const modal = await this.modalController.create({
      component: ApprovalModalComponent,
      componentProps: element,
      swipeToClose: true,
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    modal.onDidDismiss().then((data) => {
      this.showGrid = true;
      this.setDatasource(this.taskId);
    });
    return await modal.present();
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


}









