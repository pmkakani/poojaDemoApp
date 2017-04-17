import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Userpage } from './userpage';

@NgModule({
  declarations: [
    Userpage,
  ],
  imports: [
    IonicPageModule.forChild(Userpage),
  ],
  exports: [
    Userpage
  ]
})
export class UserpageModule {}
