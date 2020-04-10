import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient } from '@angular/common/http';
import { ShareNeedService } from './share/share-need.service';
import { Groceries } from './dashboard/requests/requests.component';
import { Tasks } from './share/tasks.enum';
const dataPath = 'assets/data/share-need.json';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private httpClient: HttpClient,
    private shareNeedService: ShareNeedService

  ) {
    httpClient.get<Groceries[]>(dataPath).subscribe( (data: Groceries[]) => {
      if (data && data.length > 0) {
        this.shareNeedService.allRequest = data;
        this.shareNeedService.myRequest = data.filter( x => x.taskStatus == Tasks['My Requests']);
        this.shareNeedService.closedRequest = data.filter( x => x.taskStatus == Tasks['Closed Requests']);
      }
      this.initializeApp();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
