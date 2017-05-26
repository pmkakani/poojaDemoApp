import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { Team } from '../pages/team/team';
import { ListPage } from '../pages/list/list';
import { Tabs } from '../pages/tabs/tabs';
import { Search } from '../pages/search/search';
import { Wishlist } from '../pages/wishlist/wishlist';
import { Cart } from '../pages/cart/cart';
import { Account } from '../pages/account/account';
import { Userpage } from '../pages/userpage/userpage';


import { UserData } from '../providers/user-data';


@Component({
  templateUrl: 'app.html'

})
export class MyApp {
  homeTab=Search;
  searchTab=Search;
  wishListTab=Wishlist;
  cartTab=Cart;
  acountTab=Userpage;

  cartTotal:number;


  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
    tabs: Array<{title: string, root: any, icon:any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
  public userData:UserData) {
    this.initializeApp();
this.cartTotal=this.userData.total_qty;

    // used for an example of ngFor and navigation
   /* this.pages = [
      
      { title: 'List', component: ListPage },
       { title: 'Team', component: Team },
       
    ];

this.tabs = [
{title: 'Home', root: Search,icon:"home"},
{title: 'Search', root: Search,icon:"search"},
{title: 'Wishlist', root: Wishlist,icon:"heart"},
{title: 'Cart', root: Cart,icon:"cart"},
{title: 'Account', root: Userpage,icon:"person"},
];

*/

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
