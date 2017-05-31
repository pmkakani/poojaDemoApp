import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {OrderPlaced} from '../order-placed/order-placed';
import {UserData} from '../../providers/user-data';

/**
 * Generated class for the CustomerDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customer-details',
  templateUrl: 'customer-details.html',
})
export class CustomerDetails {


  pushPage=OrderPlaced;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public userdata:UserData) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetails');
  }

}
