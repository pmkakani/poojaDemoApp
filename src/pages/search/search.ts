import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs';
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
  items: Array<{title: string, price: number, icon: string,id:string,quantity:number,itemTotalPrice:number,category:string}>;
  str:string;
  sort:string;
  search:string;
  category:string;
  till:number;

itemsBackup=[];
categories:any;
searchTerm: string = '';
searching: any = false;
    searchControl: FormControl;
  hasmore:number;

noMoreItemsAvailable = false;
public productList =[];


  constructor(private loadingController:LoadingController,public navCtrl: NavController, public userdata: UserData,public navParams: NavParams,
  public http: Http) {
    console.log(",,,,,constructor......");
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
    //this.itemsBackup=this.items;
    
  }



   loadMore()
   {
      

this.items=[];
this.http.get('http://moneymint.net/app_testing/decor_products.php')
     
      //this.http.get('http://192.168.1.244:8888/decor_products.php')
      .map(res => res.json())
      .subscribe(data =>
      {
        console.log(",,,,,DATA......"+data);
         this.productList = data.product_details;
         //this.hasmore=data.hasSomeMore.has_more;

         //console.log(",,,,,hasmore......"+data.hasSomeMore.has_more);
         for (let i = 0; i < this.productList.length; i++) {
        this.items.push({
        title:  this.productList[i].p_name,
        price: this.productList[i].p_price,
        icon: this.productList[i].p_image_id,
        id: this.productList[i].p_id,
        quantity: 0,
        itemTotalPrice:this.productList[i].p_price,
        category:this.productList[i].p_category
      });
    }
    this.itemsBackup=this.items;
      });

    
     /* if ( this.hasmore == 0 ) {
			  this.noMoreItemsAvailable = true;
			}
      console.log("noMoreItemsAvailable...."+this.noMoreItemsAvailable);
      */
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



*/
  

    onSearchInput(){
      console.log("onSearchInput........");
        this.searching = true;
        
    }

setFilteredItems() {
        this.items=this.itemsBackup;

        this.items=this.items.filter((item) => {
            return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        }); 

        this.loadProductsByCategory(this.items,"setFilteredItems");
        
  console.log("....setFilteredItems...this.items...."+this.items.length);
 
    }

  

ionViewWillEnter() {
console.log("ionViewWillEnter.........HOME .....");
this.items=this.itemsBackup;
this.searchTerm='';
this.loadProductsByCategory(this.itemsBackup,"ionViewWillEnter");

}
    

     loadProductsByCategory(input:any,caller:string)
     {
       console.log("...loadProductsByCategory................."+caller);

       let loader=this.loadingController.create({});
       loader.present().then(()=>{

       this.categories=_.chain(input)
                 .groupBy('category')
                 .toPairs()
                 .map(item=>_.zipObject(['categoryName','categoryProducts'],item))
                 .value();

                this.items=this.categories;
                console.log("categories...loadProductsByCategory......."+this.items);
                loader.dismiss();
            });
     }

     ionViewDidLoad() {
        console.log("ionViewDidLoad....SEARCH");
        this.setFilteredItems();
 
        this.searchControl.valueChanges.debounceTime(1000).subscribe(search => {
 
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

}
