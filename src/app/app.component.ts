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

    if (page.component === 'Logout') {
      this.menu.close();
      this.handleLogout();
      return;
    }

    this.activePage = page.component;
    this.menu.close();
    this.nav.setRoot(page.component);

  }

  handleLogout() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to logout?',
      buttons: [{
        text: 'Cancel',
        handler: () => { }
      }, {
        text: 'Logout',
        handler: () => {
          this.sendLogoutRequest();
        }
      }]
    });
    confirm.present();
  }

  sendLogoutRequest() {
    this.customSercvice.showLoader('Logging out...');
    this.authService.logout()
      .subscribe((res: any) => {
        this.customSercvice.hideLoader();
        this.activePage = '';
        this.events.publish('user:logout');
      }, (err: any) => {
        this.customSercvice.hideLoader()
        this.customSercvice.showToast(err.msg);
      });
  }

  openAccountPage() {
    this.menu.close();
    this.nav.setRoot('AccountPage');
  }

}

