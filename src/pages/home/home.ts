import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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
    private modalCtrl: ModalController
  ) {
    console.log(this.role);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


}
