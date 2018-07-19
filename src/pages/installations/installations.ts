import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InstallationService } from '../../providers/installation.service';
import { CustomService } from '../../providers/custom.service';
import { Installation } from '../../Classes/Models/product.model';



@IonicPage()
@Component({
  selector: 'page-installations',
  templateUrl: 'installations.html',
})
export class InstallationsPage {

  installations:Array<Installation>;
  page=1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private installationService: InstallationService,
    private customService: CustomService) {
  }

  ionViewDidLoad() {
    this.getInstallationList();
  }


  getInstallationList(refresher?: any) {

    if (!refresher) { this.customService.showLoader(); }
    this.installationService.getInstallations(1)
      .subscribe((res: any) => {

        this.installations = res;
        this.page = 1;
        refresher ? refresher.complete() : this.customService.hideLoader();
      }, (err: any) => {

        refresher ? refresher.complete() : this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }


  doRefresh(refresher) {

    this.getInstallationList(refresher);
  }

  doInfinite(infinite) {

    this.installationService.getInstallations(this.page + 1)
      .subscribe((res: Array<any>) => {
        if (res.length) {
          this.page++;
          this.installations = this.installations.concat(res);
        }
        infinite.complete();
      }, (err: any) => {

        infinite.complete();
        this.customService.showToast(err.msg);
      });
  }

  openInstallationDetailPage(index: number) {
    this.navCtrl.push('InstallationPage', { 'installation': this.installations[index] });
  }

}
