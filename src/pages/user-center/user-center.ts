import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

// 导入登陆页面
import { LoginPage } from '../login/login'

/**
 * Generated class for the UserCenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {
  // 初始化数据
  headface = "./images/3.jpg";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    // 从本地存储取出数据,判断是否登陆过
    if (localStorage.getItem('logined') === 'true') {
      // 已经登陆的状态
      // 图像会替换成本地存储里面的图像
      this.headface = 'images/' + localStorage.username + '.jpg';
    } else {
      // 没有登陆的状态，则跳转到登陆页面
      let loginModal = this.modalCtrl.create(LoginPage);

      // 监听传递过来的数据
      loginModal.onDidDismiss((data) => {
        // 是一个回调函数，有传过来的数据
        console.log(data)
        this.headface = 'images/' + data + '.jpg';
      })

      loginModal.present();
    }
  }

  // 点击注销事件
  logout() {
    localStorage.logined = '';
    localStorage.username = '';

    // 没有登陆的状态
    let loginModal = this.modalCtrl.create(LoginPage);
    // 监听传递过来的数据
    loginModal.onDidDismiss((data) => {
      // 是一个回调函数，有传过来的数据
      console.log(data)
      this.headface = 'images/' + data + '.jpg';
    })
    
    loginModal.present();
  }
}
