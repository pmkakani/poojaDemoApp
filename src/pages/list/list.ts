import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

public productList =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    this.load();
  }



   load()
   {
      this.http.get('http://localhost:8888/decor_products.php')
      .map(res => res.json())
      .subscribe(data =>
      {
        console.log(",,,,,DATA......"+data);
         this.productList = data.records;
         for (let i = 0; i < this.productList.length; i++) {
        this.items.push({
        title:  this.productList[i].p_name,
        note: 'Price $ ' + this.productList[i].p_price,
        icon: this.productList[i].p_image_id
      });
    }
      });
   }


  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
