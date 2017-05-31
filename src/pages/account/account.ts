import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderHistory } from '../order-history/order-history';

import {UserData} from '../../providers/user-data';

/**
 * Generated class for the Account page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class Account {

  pushPage=OrderHistory;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public userdata: UserData
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Account');
  }



  

}
