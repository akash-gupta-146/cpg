import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { IncidentService } from '../../providers/incidents.service';
import { CustomService } from '../../providers/custom.service';
import { Address } from '../../Classes/Models/product.model';
import { Camera } from '@ionic-native/camera';
import { Incident } from '../../Classes/Models/incident.model';

interface Category {
  id: number;
  name: string;
  categoryId: number;
  childCategory?: Array<Category>
};

@IonicPage()
@Component({
  selector: 'page-add-incident',
  templateUrl: 'add-incident.html',
})
export class AddIncidentPage {

  //data required for creating new incident
  products: Array<any>;
  categories: Array<Category>;// from server
  readonly addressTypes: Array<any> = ['Home', 'Office', 'Permanent'];

  // used for writing scalable code i.e. however deep the category hierarchy is, it will work
  categoriesList: Array<{ label: string, catgsData: Array<Category> }> = [];

  // address list that user has provided at registration time, if not provided, this is empty array
  addresses: Array<Address> = JSON.parse(localStorage.getItem('userInfo')).addresses;



  //ngModel variables
  selectedProduct: any = null;
  selectedCategory: any = null;
  title = '';
  description = '';
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
  img: any = null; // to store the image if uploaded
  showSpinner = false;// to show/hide the spinner during img upload

  // NAVPARAMS
  callback = null;// contains logic to add newly created incident to incident list
product:any=null; // product detail when navigated via product-detail page

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private incidentService: IncidentService,
    private customService: CustomService,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController
  ) {
  }

  ionViewDidLoad() {
    this.callback = this.navParams.get('callback');
    this.product = this.navParams.get('product');
    console.log(this.product);
    
    if(this.product){
      this.selectedProduct=this.product;
      this.products=[this.selectedProduct];
      this.fetchCategories(this.product.productCategoryId);
    }else{
      this.fetchProductList();
    }
  }

  fetchProductList() {

    this.customService.showLoader();
    this.incidentService.getRegisterdProducts()
      .subscribe((res: any) => {
        this.customService.hideLoader();
        this.products = res;

      },
        (err: any) => {
          this.customService.hideLoader();
          this.customService.showToast(err.msg);
        });
  }

  onProductSelect(product: any) {
    this.selectedCategory = null;
    this.selectedProduct = product;
    this.fetchCategories(this.selectedProduct.productCategoryId);

  }

  fetchCategories(productCategoryId: number) {
    this.customService.showLoader();
    this.incidentService.getProductCategories(productCategoryId)
      .subscribe((res: any) => {
        this.customService.hideLoader();
        this.categories = res;
        this.categoriesList=  []; // reset the categorieslist every time a different product is selected
        this.categoriesList.push({ label: 'Category', catgsData: this.categories });
      },
        (err: any) => {
          this.customService.hideLoader();
          this.customService.showToast(err.msg);
        });
  }


  onCatgSelect(catg: Category, index: number) {
    if (catg.childCategory) {
      const label = `Subcategory ${index + 1}`;
      this.categoriesList.splice(index + 1);
      this.categoriesList.push({ label: label, catgsData: catg.childCategory });
      this.selectedCategory = null;
    } else {
      this.categoriesList.splice(index + 1);
      this.selectedCategory = catg;
    }
  }

  onSubmit() {

    if (this.img) {
      this.postWithImg();
    } else {
      this.postWithoutImg();
    }
  }

  postWithImg() {

    let payLoad: any = {
      title: this.title,
      description: this.description,
      againstCategoryId: this.selectedCategory.id,
      productRegistrationId: this.selectedProduct.id
    };
    if (this.addresses.length) {
      payLoad['customerAddressId'] = this.selectedAddress.id
    } else {
      payLoad['customerAddress'] = this.selectedAddress;
    }

    this.customService.showLoader();
    this.incidentService.postIncidentWithImg(payLoad, this.img)
      .then((res: any) => {

        this.customService.hideLoader();
        // alert(JSON.stringify(res));
        // let res1 = JSON.parse(res.response);
        this.customService.showToast('Incident registerd successfully');
        this.addNewIncidentAndPop(res);
      })
      .catch((err: any) => {
        console.log('inside finally submit catch');
        this.customService.hideLoader();
        alert(JSON.stringify(err));

        try {
          let error = JSON.parse(err.body);
          let errMsg = error.message || error.error || "Some Error Occured,Couldn't Register Incident";
          this.customService.showToast(errMsg);
        } catch (e) {
          this.customService.showToast(e.toString() || 'Some unexpected error occured');
        }
      });
  }

  postWithoutImg() {
    // prepare payload
    const fd: FormData = new FormData();
    fd.append('title', this.title);
    fd.append('description', this.description);
    fd.append('againstCategoryId', this.selectedCategory.id);
    fd.append('productRegistrationId', this.selectedProduct.id);

    if (this.addresses.length) {
      fd.append('customerAddressId', <string>this.selectedAddress.id);
    } else {
      Object.keys(this.selectedAddress).forEach(key =>
        fd.append(`customerAddress.${key}`, this.selectedAddress[key])
      );
    }
    // send request
    this.customService.showLoader();
    this.incidentService.postIncident(fd)
      .subscribe((res: any) => {
        this.customService.hideLoader();
        this.addNewIncidentAndPop(res);
      },
        (err: any) => {
          this.customService.hideLoader();
          this.customService.showToast(err.msg);
        });
  }

  onImgUpload() {
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
        this.img = 'data:image/jpeg;base64,' + imageData;
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

  onRemoveImage() { this.img = null; }

  addNewIncidentAndPop(newIncident: Incident) {
    if (this.callback) { this.callback(newIncident); }
    this.navCtrl.pop();
  }

}
