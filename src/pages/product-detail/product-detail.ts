import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Product } from '../../Classes/Models/product.model';


@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  product: Product;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    this.product = this.navParams.get('product');
  }

  openReportIncidentPage() {
    this.navCtrl.push('AddIncidentPage', { 'product': this.product });
  }

  openProductHistoryPage(){
    this.navCtrl.push('ProductHistoryPage', { 'product': this.product });
  }

  openFeedbackPage() {
    this.navCtrl.push('FeedbackPage');
  }


  giveWarranty(endDate: string | null) {

    // if endDate is null
    if (!endDate) { return 'N.A' }

    const ed = new Date(endDate);
    ed.setHours(0);
    ed.setMinutes(0);
    ed.setSeconds(0);
    ed.setMilliseconds(0);

    const today = new Date();
    if (today < ed) {
      return `Expires on ${ed.toLocaleDateString()}`;
    } else {
      return 'Expired';
    }
  }

}
