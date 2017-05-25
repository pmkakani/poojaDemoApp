import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Search } from '../search/search';
/**
 * Generated class for the Tabs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

tab1Root: any = HomePage;
  tab2Root: any = Search;


  ionViewDidLoad() {
    console.log('ionViewDidLoad Tabs');
  }

}
