import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Signup } from '../pages/signup/signup';
import { Userpage } from '../pages/userpage/userpage';
import { Team} from '../pages/team/team';
import { Tabs } from '../pages/tabs/tabs';
import { Search } from '../pages/search/search';
import { Wishlist } from '../pages/wishlist/wishlist';
import { Cart } from '../pages/cart/cart';
import { Account } from '../pages/account/account';
import { UserData } from '../providers/user-data';
import { ProductDetails } from '../pages/product-details/product-details';
import { Checkout } from '../pages/checkout/checkout';
import { CustomerDetails } from '../pages/customer-details/customer-details';
import { OrderPlaced } from '../pages/order-placed/order-placed';
import { OrderHistory } from '../pages/order-history/order-history';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AuthService} from '../shared/authservice';
import{HttpModule} from '@angular/http'
//import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
//import { EmailComposer } from '@ionic-native/email-composer';
//import { IonicImageViewerModule } from 'ionic-img-viewer';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'c40a51a7'
 },
  'push': {
    'sender_id': '483133223612',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'icon': "drawable-hdpi-icon.png",
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Signup,
    Userpage,
    Team,
    Tabs,
    Search,
    Wishlist,
    Cart,
    Account,
    ProductDetails,
    
    Checkout,
    CustomerDetails,
    OrderPlaced,
    OrderHistory
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)

   // IonicImageViewerModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Userpage,
    Signup,
    Team,
    Tabs,
    Search,
    Wishlist,
    Cart,
    Account,
    ProductDetails,
    
    Checkout,
    CustomerDetails,
    OrderPlaced,
    OrderHistory

  ],
  providers: [
   
    HttpModule,
    AuthService,
    StatusBar,
    SplashScreen,
    UserData,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
