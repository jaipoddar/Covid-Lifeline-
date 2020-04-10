import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular'; 
import {} from 'googlemaps';
import { Plugins, Geolocation } from '@capacitor/core';
import { ShareNeedService } from '../share/share-need.service';

@Component({
  selector: 'share-need-next-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, AfterViewInit {
  @ViewChild('map', {static:true}) mapElement: ElementRef;
  map: any; 
  public tempUserDetail = {
    name:"", 
    email:"",
    phone:"",
    societyName:"",
    address:"",
    lat:"",
    lng:""
  }; 
  public markers: any[] = [];
  public infowindow: any;
  constructor(public navCtrl: NavController, public sv:ShareNeedService, public loadingController: LoadingController) { } 
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  } 
  ngOnInit() {
    this.presentLoading() 
    this.loadMap();
  }
   
  ngAfterViewInit() { 
  }
  loadMap(){

    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
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
                  zoom: 15
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
            this.tempUserDetail.address=address;
          }
        });
      }
    });
}

public GetMarkerLocation (marker:any):void{
  this.getAddress(marker.latLng);
  } 
  public RegisterUser ( ):void{ 
    this.sv.getUserList().subscribe((data :any)=>{
      this.tempUserDetail.lat=this.markers[0].getPosition().lat();
      this.tempUserDetail.lng=this.markers[0].getPosition().lng();
      data.push(this.tempUserDetail);
      localStorage.setItem('userList', JSON.stringify(data));
      localStorage.setItem('userDetails', JSON.stringify(this.tempUserDetail));
      console.log(data);
    })
    }
}
