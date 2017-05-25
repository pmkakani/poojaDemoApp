import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs';
import { Data } from '../../providers/data';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';

import {UserData} from '../../providers/user-data';
import { ProductDetails } from '../product-details/product-details';


import * as _ from 'lodash';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class Search {


  pushPage:any;
  //item:Object;
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, price: number, icon: string,id:string,quantity:number,itemTotalPrice:number}>;
  str:string;
  sort:string;
  search:string;
  category:string;
  till:number;

  //cartItems: Array<{title: string, price: string, icon: string,id:string,quantity:number}>;

searchTerm: string = '';
searching: any = false;
    searchControl: FormControl;
  hasmore:number;

noMoreItemsAvailable = false;
public productList =[];
  constructor(public navCtrl: NavController, public userdata: UserData,public navParams: NavParams,
  public http: Http) {
    this.searchControl = new FormControl();
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

 this.pushPage=ProductDetails;

    this.items = [];

    this.sort = "";
	  this.search = "";
	  this.category = "";
	  this.till=0;

    this.loadMore();
  }



   loadMore()
   {
      //this.http.get('http://192.168.1.244:8888/decor_products.php')

this.items=[];
this.http.get('http://moneymint.net/app_testing/decor_products.php')
      .map(res => res.json())
      .subscribe(data =>
      {
        console.log(",,,,,DATA......"+data);
         this.productList = data.product_details;
         this.hasmore=data.hasSomeMore.has_more;

         console.log(",,,,,hasmore......"+data.hasSomeMore.has_more);
         for (let i = 0; i < this.productList.length; i++) {
        this.items.push({
        title:  this.productList[i].p_name,
        price: this.productList[i].p_price,
        icon: this.productList[i].p_image_id,
        id: this.productList[i].p_id,
        quantity: 0,
        itemTotalPrice:this.productList[i].p_price
      });
    }
      });

      if ( this.hasmore == 0 ) {
			  this.noMoreItemsAvailable = true;
			}
      console.log("noMoreItemsAvailable...."+this.noMoreItemsAvailable);
   }
  
	
	/*
	getUrl(){
	
    this.str = "http://moneymint.net/app_testing/decor_products.php?till=";
	  
		this.till=this.till + 5;
		this.str=this.str+this.till; // pass the value to url
		
		if(this.url.sort!="" && this.url.category!=""){
			this.url.str= this.url.str+"&category="+this.url.category+"&sort="+this.url.sort;
		}
		else if(this.url.category!="" ){
			this.url.str= this.url.str+"&category="+this.url.category;
		}
		else if(this.url.sort!=""){  
			this.url.str= this.url.str+"&sort="+this.url.sort;
		}
		console.log("URL.....",this.str);
		return this.str;
	}


  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Search, {
      item: item
    });
  }

*/
  addToCart(event, item) {
    console.log(",,,,,item......"+item);
    this.userdata.addToCart(item);


  }
openDetails(event, item) {
    console.log(",,,,,item details......"+item);
    //this.userdata.addToCart(item);


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
/*
doInfinite(infiniteScroll)
{
  console.log("doInfinite........");
  if(this.hasmore!=0)
  {
    this.loadMore();

  }
infiniteScroll.complete();
			
}
*/
    onSearchInput(){
        this.searching = true;
    }
}
