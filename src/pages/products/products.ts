import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductService } from '../../providers/product.service';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  products: Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private productService: ProductService
  ) { }

  ionViewDidLoad() {
    this.products = this.productService.getProducts();
  }


  openAddProductPage() {
    const modal = this.modalCtrl.create("AddProductPage");
    modal.present();
  }

  onSortFilterSelect(event: any) {

  }

  openProductDetailPage(index: number) {
    this.navCtrl.push('ProductDetailPage', { 'product': this.products[index] });
  }

}
