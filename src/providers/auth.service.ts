import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { HttpHeaders } from '@angular/common/http';
declare var URLPREFIX;
declare var ROLE;


@Injectable()
export class AuthService {

    constructor(private http: CustomHttpService) { }

    // Notification token update after user login
    // tokenUpdate(token) {
    //     const notificationToken: Object = {
    //         notificationToken: token
    //     }
    //     return this.http.put('/update', notificationToken)
    // }

    login(loginCredentials: any) {
        const xAccountHeader = new HttpHeaders()
        .set('x-account','customer');
        return this.http.post(`/oauth/token?grant_type=password&username=${loginCredentials.contactNo}&password=${loginCredentials.password}`,{},xAccountHeader);
    }      

    register(data:any){
        return this.http.postForRegister('/customer-signup',data); 
    }

    isLoggedIn() {
        return localStorage.getItem('access_token') ? true : false;
    }

    saveToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    fetchUserDetails() {
        return this.http.get('/customer-info').map((res) => {
            this.saveUserDetails(res);
            return res;
        });
    }

    saveUserDetails(userInfo: any) {

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

 


}
