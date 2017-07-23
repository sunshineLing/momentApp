import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// 引入需要跳转的页面
import { contactDetailPage } from '../contactDetail/contactDetail'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  // 一般数据源都是从api进行获取，这里我们知识模拟一下已经取到的数据
  // 创建类
  public items;
  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    // 模拟数据
    this.items = [
      {"id": 1, "name": '小树', "desc": "一只爱睡懒觉的猪"},
      {"id": 2, "name": '冲冲', "desc": "有趣的女孩子"},
      {"id": 3, "name": '莎莎', "desc": "做饭好吃，爽朗"},
      {"id": 4, "name": '灵灵', "desc": "一个爱敲代码的好孩子"},
      {"id": 5, "name": '小丽', "desc": "一个胖乎乎的可爱姑娘"},
    ]
  }

  // 点击事件
  itemClick(event, item) {
    // 在点击的时候，加载对应的列表页面
    // 导入导航组件NavParams
    // 导入需要进入的详情页面页面
    this.navCtrl.push(contactDetailPage, {
      // 向跳转的页面传入参数
      item: item
    })
  }

  // 删除item
  removeItem(item) {
    // 先确认是否删除
    
    // 从列表里面把当前的项目删除掉
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === item.id) {
        this.items.splice(i, 1);
        // 实际是发送请求，把用户的id发送到后台，从数据库删除
        // 然后给items重新赋值，数据改变，视图会自动更新
      }
    }
  }
}
