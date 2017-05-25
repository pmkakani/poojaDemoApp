import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs';
import { Data } from '../../providers/data';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, price: string, icon: string,id:string}>;

searchTerm: string = '';
searching: any = false;
    searchControl: FormControl;
  _cart = [];


public productList =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http) {
    this.searchControl = new FormControl();
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

 

    this.items = [];
    this.load();
  }



   load()
   {
      this.http.get('http://192.168.1.244:8888/decor_products.php')
      .map(res => res.json())
      .subscribe(data =>
      {
        console.log(",,,,,DATA......"+data);
         this.productList = data.records;
         for (let i = 0; i < this.productList.length; i++) {
        this.items.push({
        title:  this.productList[i].p_name,
        price: 'Price $ ' + this.productList[i].p_price,
        icon: this.productList[i].p_image_id,
        id: this.productList[i].p_id
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


  addToCart(item) {
    this._cart.push(item);
  }


  filterItems(searchTerm){
 
        return this.items.filter((item) => {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     
 
    }


    setFilteredItems() {
 

        this.items = this.filterItems(this.searchTerm);
 
    }

    ionViewDidLoad() {
 
        this.setFilteredItems();
 
        this.searchControl.valueChanges.debounceTime(20).subscribe(search => {
 
            this.searching = false;
            this.setFilteredItems();
 
        });
 
 
    }

    onSearchInput(){
        this.searching = true;
    }
}
