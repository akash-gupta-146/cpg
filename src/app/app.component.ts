import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, App, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth.service';
import { NetworkService } from '../providers/network.service';
import { CustomService } from '../providers/custom.service';
import { UserSessionManage } from '../Classes/user-session-manage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp extends UserSessionManage {
  // rootPage:any = "LoginPage";

  @ViewChild(Nav) nav: Nav;
  // defaultUserImage: string = "assets/imgs/user.png";

  constructor(
    public events: Events,
    public appCtrl: App,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public networkService: NetworkService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public menu: MenuController,
    private customSercvice: CustomService,
  ) {
    super(events, appCtrl, authService, alertCtrl, networkService, menu, customSercvice);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page: any) {

    /**Handle the case when user pic is clicked */
    if (!page) {
      this.activePage = "";
      this.menu.close();
      // this.nav.setRoot("AccountPage");
      return;
    }

    if (page.component === 'NA') {
      this.activePage = '';
      this.menu.close();
      this.events.publish('user:logout');
      return;
    }


    this.activePage = page.component;
    this.menu.close();
    this.nav.setRoot(page.component);

  }

  openAccountPage() {
    this.menu.close();
    this.nav.setRoot('AccountPage');
  }

}

