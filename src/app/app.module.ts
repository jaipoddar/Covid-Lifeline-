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
import { JoinGroupPage } from './joingroup/joingroup.page';
import { FormsModule } from '@angular/forms';
import { ApprovalModalComponent } from './approval-modal/approval-modal.component';
import { RegistrationComponent } from './registration/registration.component';
import {CreategroupPage} from './creategroup/creategroup.page';

@NgModule({
    // tslint:disable-next-line:max-line-length
    declarations: [AppComponent, DashboardPage, TabsPage, AboutPage, ContactPage, RequestsComponent, AddRequestPage, JoinGroupPage, ApprovalModalComponent, RegistrationComponent, CreategroupPage],
  entryComponents: [ApprovalModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, MaterialModule, HttpClientModule, FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
