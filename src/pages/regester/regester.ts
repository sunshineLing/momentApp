import { Component } from '@angular/core';
import { NavController, ViewController, ToastController, LoadingController, AlertController } from 'ionic-angular';

import { utilService } from '../../app/util.service'

import { Http } from '@angular/http'
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-regester',
  providers: [utilService],
  templateUrl: 'regester.html'
})
export class RegesterPage {
  usermail;
  username;
  password;
  passwordconfirm;


  constructor(public navCtrl: NavController, 
  public viewCtrl: ViewController,
  public util: utilService,
  private toastCtrl: ToastController,
  public loadingCtrl: LoadingController,
  private alertCtrl: AlertController,
  public http: Http
  ) {
    
  }

  // 关闭注册模态框
  closeModel() {
    // 需要导入ViewController，用于页面的关闭
    this.viewCtrl.dismiss()
  }

  // 注册功能
  register() {
    // 检测用户输入

    // 1.0 判断用户空的输入
    const email = this.usermail;
    const name = this.username;
    const password = this.password;
    const passwordconfirm = this.passwordconfirm;

    // 如果邮箱匹配
    if (this.util.checkMail(email)) {
      // 检查密码长度和两次密码是否一致
      if (name == undefined || name == '') {
        // 弹出框提示
        let toast = this.toastCtrl.create({
          message: '请确认用户名不能为空！',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      } else if (password == undefined || passwordconfirm == undefined) {
        // 弹出框提示
        let toast = this.toastCtrl.create({
          message: '请确认密码长度不低于六位！',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      } else if (password.length < 6) {
        // 弹出框提示
        let toast = this.toastCtrl.create({
          message: '请确认密码长度不低于六位！',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      } else {
        if (password != passwordconfirm) {
          let toast = this.toastCtrl.create({
            message: '请确认两次输入的密码一致！',
            duration: 2000,
            position: 'top'
          });
          toast.present();
        } else {
          // loading加载进度条出现
          let loader = this.loadingCtrl.create({
            // content: "登陆中...",
            spinner: "circles",
            duration: 3000
          })
          loader.present();

          // 提交API请求，进行注册功能
          const url = "https://api.gugujiankong.com/account/Register?email=" + email + "&username=" + name + "&password=" + password;
          this.http.get(url).subscribe((data) => {
            console.log(data);

            // loading加载进度条隐藏
            loader.dismiss();

            // 提示用户注册成功，返回登陆页面登陆
            let alert = this.alertCtrl.create({
              title: '',
              subTitle: '注册成功,请尽快登陆使用',
              buttons: [
                {
                  text: 'cancel',
                  role: 'cancel',
                  handler: data => {
                    return false;
                  }
                },
                {
                text: '登陆',
                handler: (data) => {
                  // 跳转到登陆页面
                  this.navCtrl.push(LoginPage);
                }
              }]
            });
            alert.present();

          }, (err) => {
            // 注册失败
            loader.dismiss();
            let alert = this.alertCtrl.create({
              title: '注册失败',
              subTitle: '输入的邮箱已注册过，请修改后注册'
            })
            alert.present();
          });

        }
      }
    } else {
      // 弹出框提示
      let toast = this.toastCtrl.create({
        message: '请检查您填写的邮箱地址是否正确',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
  }
}
