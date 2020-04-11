import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular'; 
import {} from 'googlemaps';
import { Plugins, Geolocation } from '@capacitor/core';
import { ShareNeedService } from '../share/share-need.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'share-need-next-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, AfterViewInit {
  @ViewChild('map', {static:true}) mapElement: ElementRef;
  map: any;  
  tempUserDetail = this.fb.group(
    { 
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
     // societyName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      lat: new FormControl('', Validators.required),
      lng: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
    }
  );
  tempGroupList=[];
  public markers: any[] = [];
  public infowindow: any;
  constructor(private fb: FormBuilder,public navCtrl: NavController, public sv:ShareNeedService, public loadingController: LoadingController, private router: Router, public toastController: ToastController,) { } 
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  } 
  async presentToast() {
    const toast = await this.toastController.create({
      header: '',      
      position: 'bottom',
      message: 'saved Successfully !!',
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
    this.sv.getGrouList().subscribe((data :any)=>{
      this.tempGroupList=data;
      })
    this.presentLoading() 
    this.loadMap();
  }
   
  ngAfterViewInit() { 
  }
  loadMap(){

    let latLng = new google.maps.LatLng(22.845841256578144, 81.96129556849517);

    let mapOptions = {
      center: latLng,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel:false
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.setMap(); 
  }
  public setMap(): void { 
    Geolocation.getCurrentPosition().then((position) => {
      console.log(position); 
                let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                
                let mapOptions = {
                  center: latLng,
                  zoom: 15,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  scrollwheel:false
              };
              this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
              this.addMarker(latLng);
              this.getAddress(latLng);
    }  , (err) => { 
      alert("Please click on allow location to register");

  });
  }
  public addMarker(latLng:any): void { 

    let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        draggable:true
    });
    this.tempUserDetail.controls['lat'].setValue(marker.getPosition().lat());
      this.tempUserDetail.controls['lng'].setValue(marker.getPosition().lat());  
    marker.addListener("dragend", this.GetMarkerLocation.bind(this))
    this.markers.push(marker); 
}
public  getAddress(latLng:any): any{
  var service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch({
      location: latLng,
      // rankBy: 1,
      // type:"street_address",
      radius:100
    }, (results,status) => {
      console.log(results)
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        service.getDetails({
          placeId: results[0].place_id
        }, (results,status) => {
          console.log(results)
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            let address= results.formatted_address;
            this.tempUserDetail.controls['address'].setValue(address); 
          }
        });
      }
    });
}

public GetMarkerLocation (marker:any):void{
  this.getAddress(marker.latLng);
  } 
  public RegisterUser ( ):void{ 
    this.tempUserDetail.markAllAsTouched();
    if(this.tempUserDetail.status!="INVALID")
    {
    this.sv.getUserList().subscribe((data :any)=>{
      this.tempUserDetail.controls['lat'].setValue(this.markers[0].getPosition().lat());
      this.tempUserDetail.controls['lng'].setValue(this.markers[0].getPosition().lat()); 
      data.push(this.tempUserDetail.getRawValue());
      localStorage.setItem('userList', JSON.stringify(data));
      localStorage.setItem('userDetails', JSON.stringify(this.tempUserDetail.getRawValue()));
      console.log(data);
      this.presentToast();
      this.router.navigateByUrl('/tabs/dashboard');
      })
    }
   }
}
