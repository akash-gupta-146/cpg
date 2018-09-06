import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductService } from '../../providers/product.service';
import { Incident } from '../../Classes/Models/incident.model';
import { CustomService } from '../../providers/custom.service';
import { Product } from '../../Classes/Models/product.model';

@IonicPage()
@Component({
  selector: 'page-product-history',
  templateUrl: 'product-history.html',
})
export class ProductHistoryPage {

  product: Product;
  title = '';
  history: Incident[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private customService: CustomService,
    private productService: ProductService) {
  }

  ionViewDidLoad() {
    this.product = this.navParams.get('product');
    this.title = 'History: '+this.product.productName;
    this.getHistory();
  }

  getHistory() {
    this.customService.showLoader();
    this.productService.getProductHistory(this.product.id)
      .subscribe((res: Array<Incident>) => {
        this.history=res;
        this.customService.hideLoader();
      }, (err: any) => {
        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

  openIncidentDetailPage(index:number){}

}
