import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Wishlist } from './wishlist';

@NgModule({
  declarations: [
    Wishlist,
  ],
  imports: [
    IonicPageModule.forChild(Wishlist),
  ],
  exports: [
    Wishlist
  ]
})
export class WishlistModule {}
