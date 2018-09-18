import { AlertController, Events, App, MenuController } from 'ionic-angular';
import { AuthService } from '../providers/auth.service';
import { NetworkService } from '../providers/network.service';

// import { LoginPage } from '../pages/login/login';
import { CustomService } from '../providers/custom.service';

// declare var URLPREFIX;
declare var ROLE;
export class UserSessionManage {

    rootPage: any;
    sideMenuOptions: Array<any>;
    userImage: string;
    userName: string;
    userEmail: string;
    activePage: any;


    constructor(
        public events: Events,
        public appCtrl: App,
        public authService: AuthService,
        public alertCtrl: AlertController,
        public networkService: NetworkService,
        public menu: MenuController,
        public customService: CustomService,
    ) {

        this.handleEvents();
        this.networkService.checkNetworkStatus();
        this.hasLoggedIn();
    }

    public handleEvents() {
        this.events.subscribe('user:login', () => {
            this.login();
        });
        // this.events.subscribe('session:expired', () => {
        //     this.sessionExpired();
        // });
        this.events.subscribe('user:logout', () => {
            this.logout();
        });
        this.events.subscribe("offline", () => {
            this.offline();
        });
        this.events.subscribe("online", () => {
            this.online();
        });
        this.events.subscribe("user:image", () => {
            this.imageUpdate();
        });
    }


    public hasLoggedIn() {
        if (this.authService.isLoggedIn()) {
            this.authService.fetchUserDetails()
                .subscribe((res) => {
                    this.rootPage = "HomePage";
                    this.activePage = "HomePage";
                    this.decideSideMenuContent();
                    this.menu.enable(true);
                    this.imageUpdate();
                    // this.enablePushNotifications();
                }, (err: any) => {
                    // open the login page again if some error occurs
                    localStorage.clear();
                    this.appCtrl.getRootNavs()[0].setRoot("LoginPage",{},{animate:true,direction:'forward'});
                });

        } else {
            this.rootPage = "LoginPage";
        }
    }

    public login() {
        // this.setRootPage();
        this.appCtrl.getRootNavs()[0].setRoot("HomePage",{},{animate:true,direction:'forward'});
        this.decideSideMenuContent();
        this.activePage = "HomePage";
        this.menu.enable(true);
        this.imageUpdate();
        // this.enablePushNotifications();
    }

    // enablePushNotifications() {
    //     this.pushMsgService.initializeFCM();
    // }


    decideSideMenuContent() {

        this.sideMenuOptions = [

            { title: 'Home', component: "HomePage", icon: 'home' },
            { title: 'Installations', component: "InstallationsPage", icon: 'build' },
            { title: 'Products', component: "ProductsPage", icon: 'md-cube' },
            { title: 'Incidents', component: "IncidentsPage", icon: 'alert' },
            { title: 'Logout', component: 'Logout', icon: 'log-out' }
        ];
    
    }

    public imageUpdate() {

        this.userImage = JSON.parse(localStorage.getItem('userInfo')).picUrl;
        this.userName = JSON.parse(localStorage.getItem('userInfo')).name || '';
        this.userEmail = JSON.parse(localStorage.getItem('userInfo')).email || '';
    }

    public logout() {

        localStorage.clear();
        
        // URLPREFIX = undefined;
        // ROLE = undefined;
        this.appCtrl.getRootNavs()[0].setRoot("LoginPage",{},{animate:true,direction:'forward'});
    }

    public offline() {
        // if (this.authService.isLoggedIn()) {

        //     this.appCtrl.getRootNavs()[0].setRoot(NoInternet);
        // }
    }

    public online() {
        // if (this.authService.isLoggedIn()) {
        //     this.login();
        // } else {
        //     this.logout();
        // }
    }


    // public sessionExpired() {

    //     let alert = this.alertCtrl.create({
    //         title: 'Session Expired',
    //         message: "You're already logged in some other device. You may again login.",
    //         enableBackdropDismiss: false,
    //         buttons: [{
    //             text: 'Logout',
    //             handler: () => {
    //                 this.events.publish("user:logout");
    //             }
    //         }]
    //     });
    //     alert.present();
    // }


}


