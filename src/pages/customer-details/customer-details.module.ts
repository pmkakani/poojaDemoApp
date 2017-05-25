import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerDetails } from './customer-details';

@NgModule({
  declarations: [
    CustomerDetails,
  ],
  imports: [
    IonicPageModule.forChild(CustomerDetails),
  ],
  exports: [
    CustomerDetails
  ]
})
export class CustomerDetailsModule {}
