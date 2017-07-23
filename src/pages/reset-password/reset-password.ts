import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { utilService } from '../../app/util.service'
/**
 * Generated class for the ResetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-reset-password',
  providers: [utilService],
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  usermail;

  constructor(public navCtrl: NavController, public navParams: NavParams, public util: utilService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetpassword() {
    // 请求api，重置密码
    const email = this.usermail;
    if (this.util.checkMail(email)) {
      
    }
  }

}
