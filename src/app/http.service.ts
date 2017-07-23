import { Injectable } from '@angular/core';

import { Http, Response, Headers, ResponseOptions } from '@angular/http'
import 'rxjs/add/operator/toPromise';

@Injectable()

export class HttpService {
    // // 定义公共的url
    private url = 'https://api.gugujiankong.com/account/'

    constructor(private http: Http) { };

    // user;
    // 注册请求
    register(email, name, password) {
        const url = this.url + "Register?email=" + email + "&username=" + name + "&password=" + password;
        return this.http.get(url)
        .toPromise()
        .then()
    }
}