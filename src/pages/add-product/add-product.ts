import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { CustomService } from '../../providers/custom.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ProductService } from '../../providers/product.service';
import { Camera } from '@ionic-native/camera';
import { Address } from '../../Classes/Models/product.model';

interface Category {
  id: number;
  name: string;
  categoryId: number;
  childCategory?: Array<Category>
}

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  brands: Array<{ name: string, id: number }>; // store the brand list from the server
  categories: Array<Category>; // stores the categorylist from the server
  warrantyDurationTypes = ['Years', 'Months'];

  // used for writing scalable code i.e. however deep the category hierarchy is, it will work
  categoriesList: Array<{ label: string, catgsData: Array<Category> }> = [];
  productTypes: Array<any>;

  //ngModel variables
  productDetailMethod = 'barcode'; // intial value is barcode

  //optional details to be filled by user
  purchaseDate = '';
  warrantyPeriod: number; // either in months or years
  warrantyDurationType: string;
  dealerName = '';
  dealerContact = '';
  billNumber = '';
  // used in case user is not scanning the barcode
  selectedBrandId: number;
  selectedCategoryId: number;
  selectedProductTypeId: number;
  selectedProduct: any;
  barcodeNumber: string;

  showSpinner = false; // for showing spinner during bill upload
  billPic: any;

  installationRequest = false; // to ask if product being registered is already installed or not

  // address list that user has provided at registration time, if not provided, this is empty array
  addresses: Array<Address> = JSON.parse(localStorage.getItem('userInfo')).addresses;
  // addresses: Array<Address> = [];

  // if address list is available, choose from that list, otherwise enter the address details
  selectedAddress: Address = this.addresses.length ? null : {
    addressType: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    phone: '',
  };
  readonly addressTypes: Array<any> = ['Home', 'Office', 'Permanent'];
  installationComment = '';


  get today() { return new Date().toISOString().slice(0, 10); }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private customService: CustomService,
    private productService: ProductService,
    private barcodeScanner: BarcodeScanner,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController
  ) {

  }

  getInfoForRegistration() {
    this.customService.showLoader();
    this.productService.getInfoForProductRegister()
      .subscribe((res: any) => {
        this.customService.hideLoader();
        this.brands = res.brands;
        this.categories = res.productCategories;
        this.categoriesList.push({ label: 'Category', catgsData: this.categories });
      }, (err: any) => {
        this.customService.hideLoader();
        this.customService.showToast(err.msg);
        this.dismiss();
      });
  }

  onProductDetailMethodChange() {
    this.selectedProduct = null;
    if (this.productDetailMethod == 'manual') {
      this.selectedBrandId = this.selectedCategoryId = this.selectedProductTypeId = null;
      // fetch data only first time, when not available
      if (!this.brands && !this.categories) {
        this.getInfoForRegistration();
      }
    }
  }

  onCatgSelect(catg: Category, index: number) {
    if (catg.childCategory) {
      const label = `Subcategory ${index + 1}`;
      this.categoriesList.splice(index + 1);
      this.categoriesList.push({ label: label, catgsData: catg.childCategory });
      this.selectedCategoryId = null;
      this.productTypes = null;
    } else {
      this.categoriesList.splice(index + 1);
      this.selectedCategoryId = catg.id;
      this.getCategoryType(this.selectedCategoryId);
    }
  }

  onProductTypeSelect(type: any) {
    this.selectedProductTypeId = type.id;
    this.getProductId();
  }


  getCategoryType(selectedCId: number) {
    this.customService.showLoader();
    this.productService.getCategoryTypes(selectedCId)
      .subscribe((res: any) => {
        this.customService.hideLoader();
        this.productTypes = res;
      }, (err: any) => {
        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

  // usinng brand Id and product type id
  getProductId() {
    this.customService.showLoader();
    this.productService.getProductId(this.selectedBrandId, this.selectedProductTypeId)
      .subscribe((res: any) => {
        this.customService.hideLoader();
        this.selectedProduct = res[0];
        if (!this.selectedProduct) { this.customService.showToast('No product found for selected brand and product type. Please check and try again', 'bottom', true); }
      }, (err: any) => {
        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

  // usinng barcode scanner number
  getProductIdForBarcode() {
    this.customService.showLoader();
    this.productService.getProductIdUsingBarcode(this.barcodeNumber)
      .subscribe((res: any) => {
        this.customService.hideLoader();
        this.selectedProduct = res[0];
        if (!this.selectedProduct) { this.customService.showToast('No product found for selected brand and product type. Please check and try again', 'bottom', true); }
      }, (err: any) => {
        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

  onBillUpload() {
    const actionSheet = this.actionSheetCtrl.create({

      title: 'Select File Using',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.fromCamera(this.camera.PictureSourceType.CAMERA);
          }

        },
        {
          text: 'Gallery',
          handler: () => {
            this.fromCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  fromCamera(source: any) {
    this.showSpinner = true;
    this.camera.getPicture(this.cameraOptions(source))
      .then((imageData) => {

        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        // console.log('inside camera clbl');
        this.billPic = 'data:image/jpeg;base64,' + imageData;
        this.showSpinner = false;
      }, (err: any) => {

        /**handle the case when camera opened, but pitcure not taken */
        // console.log('inisde camera 2nd clbk');
        this.showSpinner = false;
      })
      .catch((err: any) => {
        this.showSpinner = false;
        this.customService.showToast('Error occured,Try again');
      });
  }


  cameraOptions(source: any) {
    return {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,  // 0-DATA-URL, 1-FILE-URI
      sourceType: source,       // 0-PHOTOLIBRARY, 1- CAMERA
      encodingType: this.camera.EncodingType.JPEG,     // 0-JPEG, 1-PNG
      allowEdit: true,
      correctOrientation: true
    }
  }

  onRemoveImage() { this.billPic = null; }

  onProductAdd(addressForm: any) {
    // console.log(addressForm);
    
    //validations
    if (!this.selectedProduct) { this.customService.showToast('Please enter product details'); return; }
    if (!this.purchaseDate) { this.customService.showToast('Please enter purchase date'); return; }
    if (this.installationRequest) {
      if (this.addresses.length && !this.selectedAddress) {
        this.customService.showToast('Please select an address'); return;
      }
      if (!this.addresses.length && addressForm.invalid) {

        this.customService.showToast('Please fill all required address fields'); return;
      }
    }

    //construct payLoad in which productId is mandatory
    let payLoad: any = { productId: this.selectedProduct.id, purchaseDate: this.purchaseDate };
    // add other info if available

    // warranty validations
    if (this.warrantyPeriod) {
      if (!this.warrantyDurationType) { this.customService.showToast('Please select warranty duration'); return; }
      if (!Number.isInteger(Number(this.warrantyPeriod))) { this.customService.showToast('Enter an integer in warranty'); return; }
      payLoad['warrantyPeriod'] = this.warrantyPeriod;
      payLoad['warrantyPeriodType'] = this.warrantyDurationType.toUpperCase();
    }

    if (this.dealerName) { payLoad['dealerName'] = this.dealerName; }
    if (this.dealerContact) { payLoad['dealerContact'] = this.dealerContact; }
    if (this.billNumber) { payLoad['billNumber'] = this.billNumber; }
    if(this.installationRequest){
      // following key names have been used as payLoad object is to be converted eventually into formdata object
      payLoad['installation.description']=this.installationComment;
      if(this.addresses.length){
        payLoad['installation.customerAddressId'] = this.selectedAddress.id
      }else{
        payLoad['installation.customerAddress'] = this.selectedAddress;

      }
    }

    // console.log(payLoad);


    if (this.billPic) {
      this.addWithBill(payLoad);
    } else {
      this.addWithoutBill(payLoad);
    }
  }

  addWithBill(payLoad: any) {

    this.customService.showLoader();
    this.productService.registerProductWithBill(payLoad, this.billPic)
      .then((res: any) => {

        this.customService.hideLoader();
        // alert(JSON.stringify(res));
        // let res1 = JSON.parse(res.response);
        this.dismiss(JSON.parse(res.response));
        this.customService.showToast('Product registerd successfully');
      })
      .catch((err: any) => {
        console.log('inside finally submit catch');
        this.customService.hideLoader();
        // alert(JSON.stringify(err));

        try {
          let error = JSON.parse(err.body);
          let errMsg = error.message || error.error || "Some Error Occured,Couldn't Register Product";
          this.customService.showToast(errMsg);
        } catch (e) {
          this.customService.showToast(e.toString() || 'Some unexpected error occured');
        }
      });
  }

  addWithoutBill(payLoad) {
    const fd = new FormData();
    for (let key in payLoad) {
      fd.append(key, payLoad[key]);
    }
    this.customService.showLoader();
    this.productService.registerProductWithoutBill(fd)
      .subscribe((res: any) => {
        this.customService.hideLoader();
        this.dismiss(res);
        this.customService.showToast('Product registerd successfully');
      }, (err: any) => {
        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

  openScanner() {
    this.barcodeScanner.scan()
      .then(barcodeData => {
        // alert(JSON.stringify(barcodeData));
        // barcodeData && barcodeData.text && this.getProductIdUsingBarcode(barcodeData.text);
        this.getProductIdUsingBarcode(barcodeData.text);  // REMOVE LATER
      }).catch(err => {
        this.customService.showToast('Error occured in scanning barcode');
        // this.getProductIdUsingBarcode('5');  // REMOVE LATERy
      });
  }

  getProductIdUsingBarcode(barcode: string) {
    barcode = 'WAW28790IN'; //REMOVE LATER
    this.customService.showLoader();
    this.productService.getProductIdUsingBarcode(barcode)
      .subscribe((res: any) => {
        this.customService.hideLoader();
        // alert(JSON.stringify(res));
        this.selectedProduct = Array.isArray(res) ? res[0] : res;
      }, (err: any) => {
        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }


  dismiss(res?: any) {
    this.viewCtrl.dismiss(res);
  }

}
