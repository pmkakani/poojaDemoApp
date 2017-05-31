import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';


import {UserData} from '../../providers/user-data';

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistory {

items: Array<{orderId: string, productDetails: string,email:string}>;
  
public orderDetails =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http,public userdata: UserData) {
    this.loadOrders();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');
  }




loadOrders()
   {
      //this.http.get('http://192.168.1.244:8888/decor_products.php')

this.items=[];
this.http.get('http://www.moneymint.net/app_testing/viewOrders.php')
      .map(res => res.json())
      .subscribe(data =>
      {
        console.log(",,,,,DATA......"+data);
         this.orderDetails = data.orderDetails;

         for (let i = 0; i < this.orderDetails.length; i++) {
        this.items.push({
        
        orderId: this.orderDetails[i].order_id,
        productDetails:  this.orderDetails[i].product_details,
        email: this.orderDetails[i].email,
       
      });
    }
      });

   }


}
