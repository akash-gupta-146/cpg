import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IncidentService } from '../../providers/incidents.service';
import { Incident } from '../../Classes/Models/incident.model';
import { CustomService } from '../../providers/custom.service';
import { ProductService } from '../../providers/product.service';


@IonicPage()
@Component({
  selector: 'page-incidents',
  templateUrl: 'incidents.html',
})
export class IncidentsPage {

  incidents: Array<Incident>;
  page = 1;
  emptyProductList = true; // fab btn to add incident shud be visible only when user has some registered products


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private incidentService: IncidentService,
    private customService: CustomService,
    private productService: ProductService
  ) { }

  ionViewDidLoad() {
    this.getIncidentList();
    this.getProductList();
  }


  getIncidentList(refresher?: any) {

    if (!refresher) { this.customService.showLoader(); }
    this.incidentService.getIncidents(1)
      .subscribe((res: any) => {

        this.incidents = res;
        this.page = 1;
        refresher ? refresher.complete() : this.customService.hideLoader();
      }, (err: any) => {

        refresher ? refresher.complete() : this.customService.hideLoader();
        this.customService.showToast(err.msg);
      });
  }

  getProductList() {
    this.productService.getProducts()
      .subscribe(
        (res: Array<any>) => this.emptyProductList = res.length == 0,
        (err: any) => this.customService.showToast('Couldn\'t detect the products status')
      );
  }


  doRefresh(refresher) {

    this.getIncidentList(refresher);
  }

  doInfinite(infinite) {

    this.incidentService.getIncidents(this.page + 1)
      .subscribe((res: Array<any>) => {
        if (res.length) {
          this.page++;
          this.incidents = this.incidents.concat(res);
        }
        infinite.complete();
      }, (err: any) => {

        infinite.complete();
        this.customService.showToast(err.msg);
      });
  }

  openIncidentDetailPage(index: number) {
    this.navCtrl.push('IncidentPage', { 'incident': this.incidents[index] });
  }

  openNewIncidentPage() {
    const clbkToAddNewIncident = (newIncident: Incident) => {
      console.log('callback called/////');

      newIncident && this.incidents.unshift(newIncident);
    }

    this.navCtrl.push('AddIncidentPage', { 'callback': clbkToAddNewIncident });
  }

}
