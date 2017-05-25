import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Events } from 'ionic-angular';
import { Storage} from '@ionic/storage';
//import {LocalStorage} from '@ionic/localforage';

declare var require: any;
const localforage: LocalForage = require("localforage");


import {UserData} from '../../providers/user-data';

import{Checkout} from '../checkout/checkout';
/**
 * Generated class for the Cart page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class Cart {

  _cart=[];
total_qty=0;
total_amount=0;
  ionViewDidLoad() {
    console.log('ionViewDidLoad Cart');
  }


pushPage:any;
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage = new Storage(localforage);

  
  constructor(public events: Events,public userdata:UserData) {

 this.pushPage=Checkout;
  //this._cart=this.userdata._cart;
  

  }
ionViewWillLoad()
{
  console.log("...ionViewWillLoad....cart");
  this._cart=this.userdata._cart;
   this.total_qty=this.userdata.total_qty;
    this.total_amount=this.userdata.total_amount;
  console.log("...ionViewWillLoad....CART  ... "+this._cart)
}
  ionViewWillEnter()
  {
    console.log("...ionViewWillEnter....cart");
  this._cart=this.userdata._cart;
   this.total_qty=this.userdata.total_qty;
    this.total_amount=this.userdata.total_amount;
  console.log("...ionViewWillEnter....CART  ... "+this._cart)
  }

checkout(){
			console.log("checkout.....");
		}

inc(c_id){
  	console.log("inc.....");
			this.userdata.increment(c_id);
			this.total_qty=this.userdata.total_qty;
			this.total_amount=this.userdata.total_amount;
		}
		
		dec(c_id){
			this.userdata.decrement(c_id);
				this.total_qty=this.userdata.total_qty;
			this.total_amount=this.userdata.total_amount;
		}

  removeFromCart(item) {
    this.userdata.removeFromCart(item);
    this.total_qty=this.userdata.total_qty;
			this.total_amount=this.userdata.total_amount;
  }

  clearCart(){
    this.userdata.clearCart();
  }

  indexOfItem(item) {
    return this.userdata.indexOfItem(item);
  }

  countOfCart() {
    return this.userdata.countOfCart();
  }

  login(name) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(name);
    this.events.publish('user:login');
  }

  signup() {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  }

  setUsername(username) {
    this.storage.set('username', username);
  }
  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }




  
		

}
