import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';

declare var ROLE;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  role = ROLE;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events
  ) {
  }

  ionViewDidLoad() {
  }

  openPage(page: string) {
    this.navCtrl.setRoot(page, {}, { animate: true, direction: 'forward' });
    this.events.publish('rootPageChange', page);
  }


}
