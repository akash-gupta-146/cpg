import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomService } from '../../providers/custom.service';
import { Incident } from '../../Classes/Models/incident.model';
import { IncidentService } from '../../providers/incidents.service';

@IonicPage()
@Component({
  selector: 'page-change-time',
  templateUrl: 'change-time.html',
})
export class ChangeTimePage {

  incident: Incident;
  // for showing initial values
  currentDate: '';
  currentTime: '';

  callback: any; // to update the info after changing time

  get minDate() { return new Date().toISOString().slice(0, 10); }


  constructor(
    private customService: CustomService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private incidentService:IncidentService
  ) {
    this.incident = this.navParams.get('incident');
    this.callback = this.navParams.get('callback');
    if (this.navParams.get('lastScheduleDate')) {

      [this.currentDate, this.currentTime] = this.navParams.get('lastScheduleDate').split('T');
    }
  }



  onChangeTime({ comment, date, time }) {
    console.log(comment, date, time);

    const info = {
      comment,
      scheduleDate:  `${date}T${time}`,
      updateInfo: 'customerNotAvailable'
    };

    this.updateIncident(info);
  }

  updateIncident(info: any) {
    this.customService.showLoader();
    this.incidentService.customerNotAvailable(info, this.incident.id)
      .subscribe((res: any) => {
        if (this.callback) { this.callback(res); }
        this.customService.hideLoader();
        this.customService.showToast('Time updated successfully');
        this.navCtrl.pop();
      }, (err: any) => {

        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

}   
