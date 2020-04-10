import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardPage } from './dashboard/dashboard.page';
import {AddRequestPage} from './add-request/add-request.page';
import { TabsPage } from './tabs/tabs.page';
import { AboutPage } from './about/about.page';
import { ContactPage } from './contact/contact.page';
import { MaterialModule } from './material/material.module';
import { RequestsComponent } from './dashboard/requests/requests.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
<<<<<<< HEAD
  declarations: [AppComponent, DashboardPage, TabsPage, AboutPage, ContactPage, AddRequestPage],
=======
  declarations: [AppComponent, DashboardPage, TabsPage, AboutPage, ContactPage, RequestsComponent],
>>>>>>> 96ce36ae34d234f246771c90a3f44e1b771a80e1
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, MaterialModule,HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
