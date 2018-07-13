import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';



@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  history: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController
  ) {
    this.history = this.navParams.get('history');
    this.history.reverse();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  openImage(historyItem: any) {
    const photos = [{
      url: historyItem.picUrl
    }];


    let modal = this.modalCtrl.create(GalleryModal, {
      photos: photos,
      initialSlide: 0
    });
    modal.present();
  }

}
