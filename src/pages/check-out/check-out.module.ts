import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckOut } from './check-out';

@NgModule({
  declarations: [
    CheckOut,
  ],
  imports: [
    IonicPageModule.forChild(CheckOut),
  ],
  exports: [
    CheckOut
  ]
})
export class CheckOutModule {}
