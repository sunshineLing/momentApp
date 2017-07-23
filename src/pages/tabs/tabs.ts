import { Component, ViewChild } from '@angular/core';

// import { AboutPage } from '../about/about';
import { UserCenterPage } from '../user-center/user-center';
import { ContactPage } from '../contact/contact';
import { MomentPage } from '../moment/moment';
import { HomePage } from '../home/home';

import { Tabs } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab3Root = MomentPage;
  tab4Root = UserCenterPage;

  @ViewChild('mainTabs') tabRef: Tabs
  constructor() {
    
  }
  ionViewDidEnter() {
    // 在进入完成之后，动态的选择某一个tab
    // 比如说如果用户未登录，就选定第三个登陆的tab
    // 如果登陆了，就选择第一个
    let mainTabs = this.tabRef;
    mainTabs.select(1)
  }
}
