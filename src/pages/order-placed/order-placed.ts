import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import {Http, Request, RequestMethod,Headers} from "@angular/http";

import {UserData} from '../../providers/user-data';
/**
 * Generated class for the OrderPlaced page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-placed',
  templateUrl: 'order-placed.html',
})
export class OrderPlaced {
mailgunUrl='https://api.mailgun.net/v3/sandboxb216722aa6aa4123b462f348364c0268.mailgun.org/messages'
mailgunApiKey='api:key-d31c27bb0b957153f49600a86d339e0f'
  constructor(public userdata:UserData,public http: Http,public navCtrl: NavController, public navParams: NavParams,private emailComposer: EmailComposer) {
  

console.log('........... OrderPlaced..... '+userdata.email);
        this.mailgunUrl = "sandboxb216722aa6aa4123b462f348364c0268.mailgun.org";
        this.mailgunApiKey = window.btoa("api:key-d31c27bb0b957153f49600a86d339e0f");
        var message="";
        var products_details="";
        for (var i=0;i<userdata._cart.length;i++)
        {
         message+= "Item ("+(i+1)+") "+ userdata._cart[i].title+"\n";
         products_details+=userdata._cart[i].id+"-"+userdata._cart[i].quantity+";";
        }

var email=userdata.email;
var address="India";
var mobile_number="1234567890";
var order_date="2010/09/10";
products_details
var order = {'email':email,
              'address':address,
              'mobile_number':mobile_number,
              'order_date':order_date,
              'products_details':products_details
            }

console.log(".....JSON....order......"+JSON.stringify(order));
let headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');


this.http.post('http://www.moneymint.net/app_testing/addOrder.php', JSON.stringify(order), {
    headers: headers
}).subscribe(res => {
    console.log('post result %o', res);
});


        //this.send(userdata.email,"test email",message);
        userdata._cart=[];
        userdata.total_qty=0;	
			  userdata.total_amount=0;


}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPlaced..... ');
    //this.emailComposer.open
  }

send(recipient: string, subject: string, message: string) {
        var requestHeaders = new Headers();
        requestHeaders.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Origin, X-Requested-With, Content-Type, Accept, Authorization");

        //requestHeaders.append("Access-Control-Allow-Origin", "*");
        //requestHeaders.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        requestHeaders.append("Authorization", "Basic " + this.mailgunApiKey);
        requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
            body: "from=psarda@gmail.com&to=" + recipient + "&subject=" + subject + "&text=" + message,
            headers: requestHeaders
        }))
        .subscribe(success => {
            console.log("SUCCESS -> " + JSON.stringify(success));
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

}
