import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomService } from '../../providers/custom.service';
import { Incident } from '../../Classes/Models/incident.model';
import { IncidentService } from '../../providers/incidents.service';


@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  incident: Incident;

  // form fields
  rating: number;
  comment = '';

  callback:any;


  constructor(
    private customService: CustomService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private incidentService:IncidentService
  ) {
    this.incident = this.navParams.get('incident');
    this.callback = this.navParams.get('callback');
  }


  onSubmit() {
    const info = {
      comment:this.comment,
      updateInfo: 'feedback',

    };

    this.customService.showLoader();
    this.incidentService.giceFeedback(info, this.incident.id)
      .subscribe((res: any) => {
        if (this.callback) { this.callback(res.rating || this.rating); }
        this.customService.hideLoader();
        this.customService.showToast('Feedback submitted successfully');
        this.navCtrl.pop();
      }, (err: any) => {

        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

}
