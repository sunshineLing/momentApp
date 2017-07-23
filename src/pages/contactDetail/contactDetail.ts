import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contactDetail',
  templateUrl: 'contactDetail.html'
})
export class contactDetailPage {
    // 初始化item
    item;
    name;
    desc;

    constructor(
        public navCtrl: NavController, 
        public viewCtrl: ViewController,
        private navParams: NavParams
        ) {
    }

    ionViewDidLoad() {
        this.item = this.navParams.get('item');
        this.name = this.item.name;
        this.desc = this.item.desc;
    }
}
