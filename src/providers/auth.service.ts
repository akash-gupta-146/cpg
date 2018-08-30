import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { HttpHeaders } from '@angular/common/http';
import { FileUploadOptions, FileTransferObject, FileTransfer } from '../../node_modules/@ionic-native/file-transfer';

import { BASEURL } from './app.constants';


@Injectable()
export class AuthService {

    constructor(
        private http: CustomHttpService,
        private fileTransfer: FileTransfer
    ) { }

    login(loginCredentials: any) {
        const xAccountHeader = new HttpHeaders()
            .set('x-account', 'customer');
        return this.http.post(`/oauth/token?grant_type=password&username=${loginCredentials.contactNo}&password=${loginCredentials.password}`, {}, xAccountHeader);
    }

    logout() {
        return this.http.get('/c/logout');
    }

    register(data: any) {
        return this.http.postForRegister('/customer-signup', data);
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

    editUserDetails(data: any) {
        return this.http.put('/c', data);
    }

    /**edit address if present, otherwise add that address */
    editUserAddress(data: any, addId?: number) {
        if(addId){
            return this.http.put(`/c/address/${addId}`, data);
        }
        return this.http.post(`/c/address`, data);
    }

    // PROFILE PIC ADDITION
    uploadPic(image: any) {
        let myFileName: string = this.generateImageName();

        let options: FileUploadOptions = {
            fileKey: 'picture',
            fileName: myFileName,
            mimeType: "multipart/form-data",
            chunkedMode: false,
            httpMethod: "POST",
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token')
            }
        }
        const transfer: FileTransferObject = this.fileTransfer.create();
        return transfer.upload(image, BASEURL + `/c/picture`, options, false)
    }

    generateImageName() {
        //generate unique imagename based on current date-time(upto seconds)
        let date = new Date().toISOString();
        return 'IMG_' + date.substring(0, date.indexOf('.')) + '.jpg';
    }


}
