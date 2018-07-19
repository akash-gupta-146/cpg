
import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { FileUploadOptions,} from '@ionic-native/file-transfer';
import { BASEURL } from './app.constants';
import { Incident } from '../Classes/Models/incident.model';

@Injectable()
export class InstallationService {


    constructor(
        private http: CustomHttpService,
    ) { }


    getInstallations(pageNo) {
        return this.http.get(`/c/installation/page/${pageNo}`)
    }

    // requests to be used after creating incident

    getHistory(id: number) {
        return this.http.get(`/c/installation/${id}/history`);
    }

    increasePriority(data: any, id: number) {
        return this.http.put(`/c/installation/${id}`, this.convertToFormData(data));
    }

    giceFeedback(data: any, id: number) {
        return this.http.put(`/c/installation/${id}`,  this.convertToFormData(data));
    }

    customerNotAvailable(data:any,id:number){
        return this.http.put(`/c/installation/${id}`,  this.convertToFormData(data));
    }

    convertToFormData(data: any) {

        const fd = new FormData();
        for (const key in data) {
            fd.append(key, data[key]);
        }
        return fd;
    }
}

