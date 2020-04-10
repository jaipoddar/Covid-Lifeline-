import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController  } from '@ionic/angular';

@Component({
  selector: 'share-need-next-add-request',
  templateUrl: './add-request.page.html',
  styleUrls: ['./add-request.page.scss'],
})
export class AddRequestPage implements OnInit {
  categories: any[] = [];
  getObj: any[] = [];
  alert: any;
  addRequest = this.fb.group(
    {
      isCritical: (false),
      category: new FormControl('', Validators.required),
      details: new FormControl('', Validators.required),
      validity: new FormControl('', Validators.required),
    }
  );
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, public alertController: AlertController, public loadingController: LoadingController, public toastController: ToastController) { }

  ngOnInit() {
    // localStorage.setItem('allRequest', null);
    this.getObj = JSON.parse(localStorage.getItem('allRequest')) != null ? JSON.parse(localStorage.getItem('allRequest')) : [];
    console.log(this.getObj);
    // tslint:disable-next-line:max-line-length
    this.categories = [{key: 'Medicine', value: '1' }, {key: 'Grocery', value: '2' }, {key: 'Fruits/Vegetables', value: '3' }, {key: 'Others', value: '4' }];
  }
  async addNewRequest(event: Event) {
    if (this.addRequest.controls.details.value.trim() === '') {
      await this.presentAlert();
      console.log(this.getObj);
    } else {
      await this.presentLoading();
      const guid = this.createGuid();
      this.addRequest.value.id = guid;
      const userDeatils = JSON.parse(localStorage.getItem('userDeatils'));
      this.addRequest.value.user = userDeatils;
      this.getObj.push(this.addRequest.value);
      localStorage.setItem('allRequest', JSON.stringify(this.getObj));
      console.log(this.getObj);
      await this.presentToast();
      this.addRequest.reset();
    }
  }
  createGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Invalid Input',
      message: 'Please enter valid details.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your request has been raised successfully.',
      duration: 2000
    });
    toast.present();
  }

}
