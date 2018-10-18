import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncidentsPage } from './incidents';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    IncidentsPage,
  ],
  imports: [
    Ionic2RatingModule,
    IonicPageModule.forChild(IncidentsPage),
  ],
})
export class IncidentsPageModule {}
