import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// 引入极光推送插件模块
import { IonJPushModule } from 'ionic2-jpush';

import { LoginPage } from '../pages/login/login';
import { ContactPage } from '../pages/contact/contact';
import { MomentPage } from '../pages/moment/moment';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RegesterPage } from '../pages/regester/regester';
import { contactDetailPage } from '../pages/contactDetail/contactDetail'
import { UserCenterPage } from '../pages/user-center/user-center'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImagePicker } from '@ionic-native/image-picker';  // 图片上传插件
import { Geolocation } from '@ionic-native/geolocation'; // 获取地理位置信息插件
// 本地事件推送插件
import { LocalNotifications } from '@ionic-native/local-notifications'; 
// http请求插件
// import { HTTP } from '@ionic-native/http'; 

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ContactPage,
    contactDetailPage,
    MomentPage,
    HomePage,
    TabsPage,
    RegesterPage,
    UserCenterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonJPushModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ContactPage,
    contactDetailPage,
    HomePage,
    MomentPage,
    TabsPage,
    RegesterPage,
    UserCenterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    Geolocation,
    LocalNotifications,
    // HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
