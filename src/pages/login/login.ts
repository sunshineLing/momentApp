import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import 'rxjs/add/operator/map';
// http请求
// import { HTTP } from '@ionic-native/http';

import { Http, Jsonp } from '@angular/http'

// 新建的注册页面
import { RegesterPage } from '../regester/regester';
// import { utilService } from '../../app/util.service'

import { JPushService } from 'ionic2-jpush'

// 全局声明window
// declare var window;


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // 先声明
  username;
  password;
  headface = "./images/3.jpg";

  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController, 
    // private alertCtrl: AlertController, 
    private toastCtrl: ToastController, 
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private imagePicker: ImagePicker,
    public http: Http,
    public jsonp: Jsonp,
    private jPushPlugin: JPushService
    // public util: utilService,
    ) {

  }

  loginIn() {

    // 判断用户名和密码
    if (this.username === '') {
      // 弹窗提醒
      // let alert = this.alertCtrl.create({
      //   title: '用户中心',
      //   subTitle: '输入的用户名不符合要求',
      //   buttons: ["ok"]
      // });
      // alert.present();

      // 使用toast更优雅的提示错误信息
      let toast = this.toastCtrl.create({
        message: '用户名不能为空',
        duration: 2000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();  
    } else {
      // 如果用户名不为空
      // loading加载进度条出现
      let loader = this.loadingCtrl.create({
        // content: "登陆中...",
        spinner: "circles",
        duration: 3000
      })
      loader.present();

      // 请求api接口
      const url = "https://api.gugujiankong.com/account/Login?email=" + this.username + "&password=" + this.password + "&callback=JSONP_CALLBACK";

      this.jsonp.get(url)
      .map(res => {
        return res.json()
      })
      .subscribe((res) => {
        console.log(res)
        
        // 如果登陆状态码为1
        if (res.LoginStatus === 1) {
          // 本地存储用户id和token
          localStorage.setItem('signToken', res.SignToken);
          localStorage.setItem('userid', res.UserId);
          localStorage.setItem('hasLogin', '1');

          //设置客户端的别名，用于定向接收消息的推送
          this.jPushPlugin.setAlias("Client" + res.UserId);
          // window.plugins.jPushPlugin.setAlias("Client" + res.UserId);
          
          var arrayObj = new Array('Tags' + res.UserId);
          // console.log(window.plugins)
          this.jPushPlugin.setTags(arrayObj);

          // 进行loading窗口的隐藏
          setTimeout(() => {
            // 登陆加载的进度条隐藏
            loader.dismiss();

            // 当前登陆页面自身也隐藏,进入到用户中心页面,同时也传递参数username
            this.viewCtrl.dismiss(this.username)
          }, 2000);
        }

      }, (err) => {
        console.log(err);
        // 登陆失败
        // 使用toast更优雅的展示
        let toast = this.toastCtrl.create({
          message: '登录失败！',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      })
    } 
  }

  // 打开注册窗口
  openRegisterPage() {
    console.log(1)
    let registerModal = this.modalCtrl.create(RegesterPage);
    registerModal.present();
  }

  // 忘记密码
  forget() {
    // this.navCtrl.push()
  }

  // 点击上传图像
  upLoadeImage() {
    // 设置图片上传的参数
    var options = {
      maxImagesCount:1,  // 一次选择图片最多1张
      width:100,  // 图片的最大宽度
      height:100,
      quality:50 // 图片的质量，默认是100
    }

    // 双击进入系统相册，选取图片
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.headface = results[i]
          // console.log('Image URI: ' + results[i]);
          // 选择完毕之后，将图片剪裁
      }
    }, (err) => { });
  }

}
