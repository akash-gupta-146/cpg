import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CustomService } from '../../providers/custom.service';
import { InstallationService } from '../../providers/installation.service';
import { Installation } from '../../Classes/Models/product.model';


@IonicPage()
@Component({
  selector: 'page-installation',
  templateUrl: 'installation.html',
})
export class InstallationPage {

  installation: Installation;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private customService: CustomService,
    private alert:AlertController,
    private installationService: InstallationService) {
  }

  ionViewDidLoad() {
    this.installation = this.navParams.get('installation');
  }

  onFeedback() {
    const clbk = (rating: number) => { this.installation.rating = rating; }
    this.navCtrl.push('FeedbackPage', { 'incident': this.installation, 'callback': clbk,'installing':true });
  }

  onHistory() {
    this.customService.showLoader();
    this.installationService.getHistory(this.installation.id)
      .subscribe((res: any) => {
        this.customService.hideLoader();
        this.navCtrl.push("HistoryPage", { 'history': res });
      }, (err: any) => {

        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

  onNotAvailableBtn() {
    const alert = this.alert.create({
      title: 'Reschedule',
      subTitle: 'Please give reason. You can specify when you will be available.',
      inputs: [
        {
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Submit',
          handler: (data) => {
            if (data[0].trim() == '') {
              this.customService.showToast('Comment can not be empty');
              return false;
            }
            this.sendNotAvailableRequest(data[0]);
          }
        }
      ]
    });
    alert.present();
  }

  onChangePriority() {
    const alert = this.alert.create({
      title: 'Increase Priority',
      subTitle: 'Please specify some reason ',
      inputs: [
        {
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Submit',
          handler: (data) => {
            if (data[0].trim() == '') {
              this.customService.showToast('Reason can not be empty');
              return false;
            } this.sendPriortyChangeRequest(data[0]);
          }
        }
      ]
    });
    alert.present();
  }

  sendNotAvailableRequest(reason: string) {
    const info = {
      comment: reason,
      updateInfo: 'customerNotAvailable',

    };

    this.customService.showLoader();
    this.installationService.customerNotAvailable(info, this.installation.id)
      .subscribe((res: any) => {
        this.updateStatusInfo(res);
        this.customService.hideLoader();
        this.customService.showToast('Message sent successfully');
      }, (err: any) => {

        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

  sendPriortyChangeRequest(reason: string) {
    const info = {
      comment: reason,
      updateInfo: 'highPriority',

    };

    this.customService.showLoader();
    this.installationService.increasePriority(info, this.installation.id)
      .subscribe((res: any) => {
        this.installation.priority = res.priority;
        this.customService.hideLoader();
        this.customService.showToast('Priority updated successfully');
      }, (err: any) => {

        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

  updateStatusInfo(updatedIncident: any) {
    this.installation.statusColor = updatedIncident.statusColor;
    this.installation.statusId = updatedIncident.statusId;
    this.installation.statusName = updatedIncident.statusName;
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
