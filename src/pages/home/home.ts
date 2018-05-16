import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController
  ) {   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  openAddProductPage() {
    const modal = this.modalCtrl.create("AddProductPage");
    modal.present();
  }

}
