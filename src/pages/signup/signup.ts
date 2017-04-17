import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {AuthService} from '../../shared/authservice';
/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

newcreds = {
            name: '',
            password: ''
        }
  constructor(public navCtrl: NavController, public navParams: NavParams , public authservice:AuthService ,public alertCtrl:AlertController) {
     
   
        
  }

  register(user) {
        this.authservice.adduser(user).then(data => {
            if(data) {
                var alert = this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'User Created',
                    buttons: ['ok']
                });
                alert.present();
            }
    });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

}
