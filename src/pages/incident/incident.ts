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


  onChangeTimeBtn() {
    const clbk = (res) => {
      if(res){
// todo
      }
    }
    this.navCtrl.push('ChangeTimePage', { 'incident': this.incident, 'callback': clbk, 'lastScheduleDate': this.incident.lastScheduleDate });
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
          handler: (data) => { this.sendPriortyChangeRequest(data[0]); }
        }
      ]
    });
    alert.present();
  }

  sendPriortyChangeRequest(reason: string) {
    const info = {
      comment: reason,
      updateInfo: 'highPriority',

    };

    this.customService.showLoader();
    this.incidentService.increasePriority(info, this.incident.id)
      .subscribe((res: any) => {
        this.incident.priority=res.priority;
        this.customService.hideLoader();
        this.customService.showToast('Priority updated successfully');
      }, (err: any) => {

        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }
}
