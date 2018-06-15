import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductService } from '../../providers/product.service';
import { CustomService } from '../../providers/custom.service';
import { Product } from '../../Classes/Models/product.model';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  products: Array<Product>=[];   
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private productService: ProductService,
    private customService:CustomService
  ) { }

  ionViewDidLoad() {this.getProductList();  }
  
  getProductList(){
    this.customService.showLoader();
    this.productService.getProducts()
      .subscribe((res: any) => {
        this.customService.hideLoader();
        this.products = res;
      }, (err: any) => {
        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }


  openAddProductPage() {
    const modal = this.modalCtrl.create("AddProductPage");
    modal.present();
    modal.onDidDismiss((newProduct:any)=>{
      if(newProduct){
        this.products.push(newProduct);
      }
    });
  }

  onSortFilterSelect(event: any) {

  }

  openProductDetailPage(index: number) {
    this.navCtrl.push('ProductDetailPage', { 'product': this.products[index] });
  }

}
