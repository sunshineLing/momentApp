import { Injectable } from '@angular/core';

@Injectable()
export class utilService {
    checkMail(mail) {
        const reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,4}$/; 
        return reg.test(mail);
    }

    JSON_CALLBACK(data) {
        return data
    }
}