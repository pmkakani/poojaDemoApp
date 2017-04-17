import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {AuthService} from '../../shared/authservice';
import {HomePage} from '../home/home'
/**
 * Generated class for the Userpage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage(
 
)
@Component({
  selector: 'page-userpage',
  templateUrl: 'userpage.html',
})
export class Userpage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthService, public alertCtrl:AlertController) 
  {

  }

   logout() {
        this.authservice.logout();
        this.navCtrl.setRoot(HomePage);
    }
    
    getinfo() {
        this.authservice.getinfo().then(data =>{
        if((<any>data).success) {
            var alert = this.alertCtrl.create({
                title: (<any>data).success,
                subTitle: (<any>data).msg,
                buttons: ['ok']
            });
            alert.present();
        }
            
    })
    }            


  ionViewDidLoad() {
    console.log('ionViewDidLoad Userpage');
  }


}
