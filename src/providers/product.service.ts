
import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { BASEURL } from './app.constants';

@Injectable()
export class ProductService {

    constructor(
        private http: CustomHttpService,
        private fileTransfer: FileTransfer
    ) { }


    getProducts() {
        return this.http.get('/c/registered-product');
    }

    getProductHistory(id:number){
        return this.http.get(`/c/registered-product/${id}/complaint`);
    }

    // requests related to product register
    getInfoForProductRegister() {
        return this.http.get('/c/register-product/save-info');
    }

    getCategoryTypes(cId: number) {
        return this.http.get(`/c/product-type/${cId}`);
    }

    getProductId(bId: number, typeId: number) {
        return this.http.get(`/c/product?brandId=${bId}&typeId=${typeId}`);
    }

    getProductIdUsingBarcode(barCode: string) {
        return this.http.get(`/c/product?barcode=${barCode}`);
    }

    registerProductWithoutBill(data: any) {
        return this.http.post(`/c/register-product`, data);
    }

    registerProductWithBill(data: any, image: any) {
        let myFileName: string = this.generateImageName();

        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: myFileName,
            mimeType: "multipart/form-data",
            chunkedMode: false,
            httpMethod: "POST",
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token')
            }
        }
        options.params = data;
        const transfer: FileTransferObject = this.fileTransfer.create();
        return transfer.upload(image, BASEURL + `/c/register-product`, options, false)
    }

    generateImageName() {
        //generate unique imagename based on current date-time(upto seconds)
        let date = new Date().toISOString();
        return 'IMG_' + date.substring(0, date.indexOf('.')) + '.jpg';
    }

}

