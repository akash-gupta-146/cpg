import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstallationsPage } from './installations';

@NgModule({
  declarations: [
    InstallationsPage,
  ],
  imports: [
    IonicPageModule.forChild(InstallationsPage),
  ],
})
export class InstallationsPageModule {}
