import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

// 引入位置插件
import { Geolocation } from '@ionic-native/geolocation';

// 本地提醒组件
import { LocalNotifications } from '@ionic-native/local-notifications';

// 极光推送插件
import { JPushService } from 'ionic2-jpush'

// 全局声明window
declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  msgList: Array<any> = [];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private geolocation: Geolocation,
    private localNotifications: LocalNotifications,
    private jPushPlugin: JPushService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      console.log(this.jPushPlugin)
      this.jPushPlugin.openNotification()
        .subscribe(res => {
          console.log('收到推送');
          console.log(res)
        });

      this.jPushPlugin.receiveNotification()
        .subscribe(res => {
          console.log('收到推送');
          console.log(res)
        });

      this.jPushPlugin.receiveMessage()
        .subscribe(res => {
          console.log('收到推送');
          console.log(res)
        });


      //初始化时启动推送插件
      // if (window.plugins && window.plugins.jPushPlugin) {
      //     window.plugins.jPushPlugin.init();

      //     document.addEventListener('jpush.receiveNotification', () => {
      //       this.msgList.push({
      //         content: window.plugins.jPushPlugin.receiveNotification.alert
      //       }, false);
      //       alert('注册极光推送');
      //     })
      // }
      // System events
      document.addEventListener("resume", resume, false);

      function resume() {
        if (window.plugins.jPushPlugin.isPlatformIOS()) {
          window.plugins.jPushPlugin.setBadge(0);
          window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
        } else if ((<any>window).plugins.jPushPlugin.isAndroid()) {
          window.plugins.jPushPlugin.setLatestNotificationNum(3);
          window.plugins.jPushPlugin.clearAllNotification();
        }
      }

      // 获取位置信息
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        // 会先弹出是否同意获取位置，再给出位置信息
        console.log(resp.coords.latitude)

      }).catch((error) => {
        console.log('Error getting location', error);
      });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
      });

      // 本地提醒组件
      this.localNotifications.schedule({
        // id: 1,
        text: '本地提醒',
        at: new Date(new Date().getTime() + 10000),
        // sound: null
        // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
      });

    });

    // 注册极光
    this.jPushPlugin.init()
      .then(res => alert(res))
      .catch(err => alert(err))
  }
}
