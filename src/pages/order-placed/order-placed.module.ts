import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPlaced } from './order-placed';

@NgModule({
  declarations: [
    OrderPlaced,
  ],
  imports: [
    IonicPageModule.forChild(OrderPlaced),
  ],
  exports: [
    OrderPlaced
  ]
})
export class OrderPlacedModule {}
