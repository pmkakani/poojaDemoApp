import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage} from '@ionic/storage';
//import {LocalStorage} from '@ionic/localforage';

declare var require: any;
const localforage: LocalForage = require("localforage");

@Injectable()
export class UserData {
  _cart = [];
  email:string;
  HAS_LOGGED_IN = 'hasLoggedIn';

  total_qty=0;	
			total_amount=0;


  storage = new Storage(localforage);

  constructor(public events: Events) {}

  hasItem(item) {
    return (this._cart.indexOf(item) > -1);
  }

  addToCart(item) {
    if( this.find(item.id)!=-1 ){

      item.quantity=item.quantity+1;
      item.itemTotalPrice=item.quantity*parseInt(item.price);
      
    }else{
      item.quantity=1;
    this._cart.push(item);
    }
    this.total_qty+=1;	
		this.total_amount+=parseInt(item.price);	
    console.log("....	this.total_amount....."+	this.total_amount);
  }

  removeFromCart(item) {
    let index = this._cart.indexOf(item);
    //item.checked=false;
    if (index > -1) {
      this._cart.splice(index, 1);

      this.total_qty-=item.quantity;	
	  	this.total_amount-=item.itemTotalPrice;	

console.log("....	item.quantity ....."+	item.quantity);
    }

  }

  clearCart(){
    this._cart = [];
  }

  indexOfItem(item) {
    return this._cart.indexOf(item);
  }

  countOfCart() {
    return this._cart.length;
  }


add(item){
		if( this.find(item.id)!=-1 ){
			var alertPopup = alert({
                title: 'Product Already Added',
                template: 'Increase the qty from the cart'
            });
			//cartObj.cart[cartObj.cart.find(id)].cart_item_qty+=1;
			//cartObj.total_qty+= 1;	
			//cartObj.total_amount+= parseInt(cartObj.cart[cartObj.cart.find(id)].cart_item_price);
		}
		else{
		    this.addToCart( { item} );
			this.total_qty+=1;	
			this.total_amount+=parseInt(item.price);	
		}
	}
	
	find(id){	
    console.log(".....find(id) ....."+id);
		var result=-1;
		for( var i = 0, len = this._cart.length; i < len; i++ ) {
      console.log(".....this._cart[i].id ....."+this._cart[i].id);
			if( this._cart[i].id === id ) {
				result = i;
				break;
			}
		}
		return result;
	}
	
	drop(id){
	 var temp=this.find(id);
   this.total_qty-= parseInt(this._cart[temp].cart_item_qty);
   this.total_amount-=( parseInt(this._cart[temp].cart_item_qty) * parseInt(this._cart[temp].price) );
	 this._cart.splice(this._cart.find(id), 1);

	}
	
	increment(id){
    console.log(".....increment.....");
    var temp=this.find(id);
    console.log(".....temp ....."+temp);
		 this._cart[temp].quantity+=1;
     console.log(".....quantity ....."+this._cart[temp].quantity);
		 this.total_qty+= 1;
		 this.total_amount+=( parseInt( this._cart[this.find(id)].price) );	
	}
	
	
decrement(id){
  	var temp=this.find(id);
    console.log(".....temp ....."+temp);
     this.total_qty-= 1;
	   this.total_amount-=( parseInt( this._cart[this.find(id)].price) );	

		 if(this._cart[temp].quantity == 1){  // if the cart item was only 1 in qty
			this._cart.splice( this.find(id) , 1);  //edited
		 }else{
		
		 this._cart[temp].quantity-=1;
		 }

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
