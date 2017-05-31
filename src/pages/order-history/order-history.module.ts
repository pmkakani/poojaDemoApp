import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderHistory } from './order-history';

@NgModule({
  declarations: [
    OrderHistory,
  ],
  imports: [
    IonicPageModule.forChild(OrderHistory),
  ],
  exports: [
    OrderHistory
  ]
})
export class OrderHistoryPageModule {}
