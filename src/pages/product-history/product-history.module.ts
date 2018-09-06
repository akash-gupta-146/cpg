import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductHistoryPage } from './product-history';

@NgModule({
  declarations: [
    ProductHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductHistoryPage),
  ],
})
export class ProductHistoryPageModule {}
