import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomService } from '../../providers/custom.service';
import { Incident } from '../../Classes/Models/incident.model';


@IonicPage()
@Component({
  selector: 'page-incident',
  templateUrl: 'incident.html',
})
export class IncidentPage {

  incident: Incident;
  rescheduleConfirmed=false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private customService: CustomService
  ) {
  }

  ionViewDidLoad() {
    this.incident = this.navParams.get('incident');
  }

  onFeedback() {
    this.navCtrl.push('FeedbackPage');
  }

  onConfirm() {
    this.rescheduleConfirmed = true;
    this.customService.showToast('Confirmed Successfully');
  }

  onChange() {
    this.navCtrl.push('ChangeTimePage');
  }
}
