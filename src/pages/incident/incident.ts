import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Button } from 'ionic-angular';
import { CustomService } from '../../providers/custom.service';
import { Incident } from '../../Classes/Models/incident.model';
import { IncidentService } from '../../providers/incidents.service';


@IonicPage()
@Component({
  selector: 'page-incident',
  templateUrl: 'incident.html',
})
export class IncidentPage {

  incident: Incident;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private customService: CustomService,
    private alert: AlertController,
    private incidentService: IncidentService
  ) {
  }

  ionViewDidLoad() {
    this.incident = this.navParams.get('incident');
  }

  onFeedback() {
    const clbk = (rating: number) => { this.incident.rating = rating; }
    this.navCtrl.push('FeedbackPage', { 'incident': this.incident, 'callback': clbk });
  }

/**old method :use this when otpion to change time is also to be given to customer */
  // onNotAvailableBtn() {
  //   const clbk = (res) => {
  //     if (res) {
  //       this.updateStatusInfo(res);
  //     }
  //   }
  //   this.navCtrl.push('ChangeTimePage', { 'incident': this.incident, 'callback': clbk, 'lastScheduleDate': this.incident.lastScheduleDate });
  // }

  onHistory(){
    this.customService.showLoader();
    this.incidentService.getHistory( this.incident.id)
      .subscribe((res: any) => {
        this.customService.hideLoader();
        this.navCtrl.push("HistoryPage",{'history':res});
      }, (err: any) => {

        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }
         
  onNotAvailableBtn(){
    const alert = this.alert.create({
      title: 'Not Available',
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
            if(data[0].trim()==''){
              this.customService.showToast('Comment can not be empty');
              return false;
            }
            this.sendNotAvailableRequest(data[0]); }
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
            if(data[0].trim()==''){
              this.customService.showToast('Reason can not be empty');
              return false;
            }this.sendPriortyChangeRequest(data[0]); }
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
    this.incidentService.customerNotAvailable(info, this.incident.id)
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
    this.incidentService.increasePriority(info, this.incident.id)
      .subscribe((res: any) => {
        this.incident.priority = res.priority;
        this.customService.hideLoader();
        this.customService.showToast('Priority updated successfully');
      }, (err: any) => {

        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

  updateStatusInfo(updatedIncident: any) {
    this.incident.statusColor = updatedIncident.statusColor;
    this.incident.statusId = updatedIncident.statusId;
    this.incident.statusName = updatedIncident.statusName;
  }

}