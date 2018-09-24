import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../../providers/auth.service';
import { CustomService } from '../../../providers/custom.service';


@IonicPage()
@Component({
  selector: 'page-edit-info',
  templateUrl: 'edit-info.html',
})
export class EditInfoPage {

  editInfo; // tells about which info to be edited
  oldValue: any; // current value of that info
  addressIndex;
  readonly addressTypes: Array<string> = ['Home', 'Office', 'Permanent'];
  title = '';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private authService: AuthService,
    private customService: CustomService
  ) {
  }

  
  ionViewDidLoad() {
    this.editInfo = this.navParams.get('editInfo');
    this.oldValue = this.navParams.get('oldValue');
    this.addressIndex = this.navParams.get('index');
    this.title = 'Edit ' + this.toTitleCase(this.editInfo);
  }

  onSave(formValue: any) {
    if (this.editInfo === 'name' || this.editInfo === 'email' || this.editInfo === 'contactNo') {
      //check if value is changed or not
      if (formValue[this.editInfo] === this.oldValue) {
        this.customService.showToast(`${this.toTitleCase(this.editInfo)} is unchanged .`, 'top');
        return;
      }
      const info = {};
      info[this.editInfo] = formValue[this.editInfo];
      this.saveChanges(info);
    } else { // in case address
      console.log(formValue);
      this.editAddress(formValue);
    }
  }

  /**not used for changing the address */
  saveChanges(data: any) {
    this.customService.showLoader();
    this.authService.editUserDetails(data)
      .subscribe((res: any) => {
        this.customService.hideLoader();
        this.customService.showToast(`${this.toTitleCase(this.editInfo)} edited successfully`);
        this.updateInfoInMemory(this.editInfo, res[this.editInfo]);
        this.navCtrl.pop();
      }, (err: any) => {
        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

  editAddress(value: any) {
    this.customService.showLoader();
    this.authService.editUserAddress(value, this.oldValue ? this.oldValue.id : undefined)
      .subscribe((res: any) => {
        this.customService.hideLoader();
        this.customService.showToast(`${this.toTitleCase(this.editInfo)} edited successfully`);
        this.updateInfoInMemory(this.editInfo, value, this.addressIndex);
        this.navCtrl.pop();
      }, (err: any) => {
        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

  updateInfoInMemory(info: string, newData: any, index?: number/**used in case of address*/) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (info === 'address') {
      userInfo.addresses[index] = newData;
    } else {
      userInfo[info] = newData;
    }
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  toTitleCase(str: string) { return str[0].toUpperCase() + str.slice(1).toLowerCase(); }

}
