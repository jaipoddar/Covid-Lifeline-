import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ShareNeedService } from '../share/share-need.service';


@Component({
  selector: 'share-need-next-approval-modal',
  templateUrl: './approval-modal.component.html',
  styleUrls: ['./approval-modal.component.scss'],
})
export class ApprovalModalComponent implements OnInit {

  constructor(public modalController: ModalController, public shareNeedService: ShareNeedService, public toastController: ToastController) { }
  @Input() priority: string;
  @Input() details: string;
  @Input() taskStatus: number;
  @Input() validity: number;
  //@Output() refreshDashboard = new EventEmitter();
  ngOnInit() { }
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
  async help() {
    const onClosedData: string = "Wrapped Up!";
    //this.shareNeedService.allRequest.find(x => x.details == this.description).taskStatus = 1;
    console.log(this.shareNeedService.allRequest);
    await this.presentToast();
    await this.modalController.dismiss(onClosedData);     
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
