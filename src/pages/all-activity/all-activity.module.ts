import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllActivityPage } from './all-activity';

@NgModule({
  declarations: [
    AllActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(AllActivityPage),
  ],
})
export class AllActivityPageModule {}
