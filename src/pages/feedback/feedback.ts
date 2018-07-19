import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomService } from '../../providers/custom.service';
import { Incident } from '../../Classes/Models/incident.model';
import { IncidentService } from '../../providers/incidents.service';
import { InstallationService } from '../../providers/installation.service';


@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  incident: Incident;
  installing=false;

  // form fields
  rating: number;
  comment = '';

  callback:any;


  constructor(
    private customService: CustomService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private incidentService:IncidentService,
    private installationService:InstallationService
  ) {
    this.incident = this.navParams.get('incident');
    this.callback = this.navParams.get('callback');
    this.installing = this.navParams.get('installing');
  }


  onSubmit() {
    const info = {
      comment:this.comment,
      rating:this.rating,
      updateInfo: 'feedback'
    };

    const service = this.installing?this.installationService:this.incidentService;
    this.customService.showLoader();
    service.giceFeedback(info, this.incident.id)
      .subscribe((res: any) => {
        if (this.callback) { this.callback(res.rating || this.rating); }
        this.customService.hideLoader();
        this.customService.showToast('Thank you for giving feedback ');
        this.navCtrl.pop();
      }, (err: any) => {

        this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

}
