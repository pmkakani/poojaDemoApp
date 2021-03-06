import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs';
//import {Observable} from 'rxjs/Observable'
//import { Team } from '../../pages/add-technology/add-technology';
/**
 * Generated class for the Team page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class Team {

public doctorList =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public http: Http) {
  }

 ionViewWillEnter()
   {
     
      this.load();
   }

   load()
   {
      this.http.get('http://www.imajalna.com/php/viewTeam.php')
      .map(res => res.json())
      .subscribe(data =>
      {
         this.doctorList = data.doctorList;
      });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Team');
  }

}
