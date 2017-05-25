import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';


import {UserData} from '../../providers/user-data';
/**
 * Generated class for the ProductDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {
  item: any;
  constructor(public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, public userdata: UserData) {
    this.item = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetails ... '+this.item );
  }


addToCart(event, item) {
    console.log(",,,,,item......"+this.item);
    this.userdata.addToCart(this.item);
    
    var alert = this.alertCtrl.create({
                title: "Success",
                subTitle: "added successfully to cart",
                buttons: ['ok']
            });
            alert.present();

  }

}
