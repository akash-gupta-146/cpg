import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events } from 'ionic-angular';
import { Address } from '../../Classes/Models/product.model';
import { Camera } from '../../../node_modules/@ionic-native/camera';
import { CustomService } from '../../providers/custom.service';
import { AuthService } from '../../providers/auth.service';

interface User {
  id: number;
  name: string;
  contactNo: string | number;
  email: string;
  picUrl: string;
  picOriginalName: string;
  addresses: Array<Address>;
}

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  userInfo: User;
  imgPic: any;
  showSpinner = false; // to show while camera is returning image to us

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private customService: CustomService,
    private authService: AuthService,
    private event: Events
  ) { }

  ionViewDidEnter() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  /**common for name,contact,email and address */
  onOtherEdit(editInfo: string, currentValue?: any,index?:number/**used in case of address only*/) {
    this.navCtrl.push('EditInfoPage', {editInfo:editInfo, oldValue:currentValue,index:index});
  }


  onPicEdit() {
    const actionSheet = this.actionSheetCtrl.create({

      title: 'Select Image from',
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
        this.imgPic = 'data:image/jpeg;base64,' + imageData;
        // alert(this.imgPic);
        this.uploadEditedImg(this.imgPic);
      }, (err: any) => {

        /**handle the case when camera opened, but pitcure not taken */
        // console.log('inisde camera 2nd clbk');
      })
      .catch((err: any) => {
        this.customService.showToast('Error occured,Try again');
      })
      .then(() => { this.showSpinner = false });
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

  uploadEditedImg(img: string) {

    this.customService.showLoader('Updating Image...');
    this.authService.uploadPic(img)
      .then((res: any) => {
        this.customService.hideLoader();
        this.updateImageInMemeory(JSON.parse(res.response).picUrl);
        this.customService.showToast('Image updated successfully');
      })
      .catch((err: any) => {
        this.customService.hideLoader();
        try {
          let error = JSON.parse(err.body);
          let errMsg = error.message || error.error || "Some Error Occured,Couldn't Update Image";
          this.customService.showToast(errMsg);
        } catch (e) {
          this.customService.showToast(e.toString() || 'Some unexpected error occured');
        }
      });
  }

  updateImageInMemeory(img: string) {

    const updatedUserinfo = JSON.parse(localStorage.getItem('userInfo'));
    updatedUserinfo.picUrl = img;
    localStorage.setItem('userInfo', JSON.stringify(updatedUserinfo));
    //update img of account page itself
    this.userInfo.picUrl = img;
    // update img at sidebar 
    this.event.publish('user:data');

  }

}
