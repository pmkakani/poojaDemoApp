import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{CustomerDetails} from '../customer-details/customer-details';
import {UserData} from '../../providers/user-data';
/**
 * Generated class for the Checkout page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class Checkout {
_cart=[];
pushPage=CustomerDetails;
  constructor(public navCtrl: NavController, public navParams: NavParams,public userdata:UserData) {

this._cart=userdata._cart;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Checkout');
  }

}
