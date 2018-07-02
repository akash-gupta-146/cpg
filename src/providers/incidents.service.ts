
import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { FileUploadOptions, FileTransferObject, FileTransfer } from '@ionic-native/file-transfer';
import { BASEURL } from './app.constants';

@Injectable()
export class IncidentService {

    constructor(
        private http: CustomHttpService,
        private fileTransfer: FileTransfer
    ) { }

    getIncidents() {
        return [
            {
                img: 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/small_image/230x210/0dc2d03fe217f8c83829496872af24a0/1/_/1_2.jpg',
                name: 'Dr. Aquaguard M  agna NXT HD RO', category: 'Water Purifier', regDate: 'Sep 12,2016', purDate: 'Jun 4 2016', warranty: '2 years', regNo: 'AD12345', mrp: '₹16,990',
                status: 'NotScheduled', dealer: { name: 'Lotus Dealers Pvt Ltd', address: 'Noida Sec 3', phone: '9874563214' },
                incident: {
                    status: 'New', created: '1 day ago', description: "Product's display not working properly", scheduledDate: '11:00 AM, 24 May 2018',
                    engineer: { name: 'Mukesh Kumar', phone: '8965471235' },
                    rejectReason: 'Product is out of warranty',
                    images: ['https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/m/a/magna-hd-ro_uv1_2.jpg', 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/m/a/magna-hd-ro_uv2_2.jpg', 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/m/a/magna-hd-ro_uv3_2.jpg']
                }
            },
            {
                img: 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/small_image/230x210/0dc2d03fe217f8c83829496872af24a0/e/u/eureka_forbes_vc-7023-min_1.jpg',
                name: 'Euro Health Clean', category: 'Vaccum Cleaner', regDate: 'Oct 12,2015', purDate: 'Jun 4 2014', warranty: '1 years', regNo: 'AD12347', mrp: '₹6,990',
                status: 'Scheduled', dealer: { name: 'American Dealers Pvt Ltd', address: 'Gurugram Sec 3', phone: '9833563214' },
                incident: {
                    status: 'Scheduled', created: '1 day ago', description: "Product's display not working properly", scheduledDate: '11:00 AM, 24 May 2018',
                    engineer: { name: 'Mukesh Kumar', phone: '8965471235' },
                    rejectReason: 'Product is out of warranty',
                    images: ['https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/e/u/eureka_forbes_vc-7014-min.jpg', 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/e/u/eureka_forbes_vc-7016-min.jpg', 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/e/u/eureka_forbes_vc-7033-min.jpg']
                }
            },
            {
                img: 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/small_image/230x210/0dc2d03fe217f8c83829496872af24a0/s/c/scpr300.jpg',
                name: 'Dr. Aeroguard SCPR 300', category: 'Air Purifier', regDate: 'Oct 12,2013', purDate: 'Jun 4 2013', warranty: '1 years', regNo: 'AD12347', mrp: '₹13,990',
                status: 'Installed', dealer: { name: 'Sufik Dealers Pvt Ltd', address: 'Gurugram Sec 45', phone: '9133563214' },
                incident: {
                    status: 'Engineer Assigned', created: '1 day ago', description: "Product's display not working properly", scheduledDate: '11:00 AM, 24 May 2018',
                    engineer: { name: 'Mukesh Kumar', phone: '8965471235' },
                    rejectReason: 'Product is out of warranty',
                    images: ['https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/s/c/scpr300.jpg', 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/d/r/dr._aeroguard_scpr_300_1_.png', 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/d/r/dr._aeroguard_scpr_300_5_.png']
                }
            },
            {
                img: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTpSo_YJ46Qb7nGdH88YXc8M5HCNUo7fv-nrAhhsJjCVvY0Xuvr_GPKybVvBA&usqp=CAc ',
                name: 'Eurovigil I Deter 100 (Biometric Access Control System)', category: 'Security Solutions', regDate: 'Oct 12,2013', purDate: 'Oct 4 2016', warranty: '5 years', regNo: 'AD12347', mrp: '₹111,990',
                status: 'ProblemInInstallation', dealer: { name: 'Security & Safety', address: 'Rohini Sec 45', phone: '9133563214' },
                incident: {
                    status: 'Fixed', created: '1 day ago', description: "Product's display not working properly", scheduledDate: '11:00 AM, 24 May 2018',
                    engineer: { name: 'Mukesh Kumar', phone: '8965471235' },
                    commentByEngineer: 'IC 345 got burnt and diplay kit is in bad condition, Problem has been fixed temporarily, kit replacement is needed .',
                    fixDate: '10:40 AM, 25 Jun 2018',
                    rejectReason: 'Product is out of warranty',
                    images: ['https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/d/o/door_lock_yale.jpg', 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/d/o/door_lock_yale.jpg']
                }
            },
            {
                img: 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/small_image/230x210/0dc2d03fe217f8c83829496872af24a0/5/s/5s-1.jpg',
                name: '5 Star Inverter Split AC – 1.00 T', category: 'Health Conditioners', regDate: 'Oct 12,2013', purDate: 'Oct 4 2016', warranty: '5 years', regNo: 'AD12347', mrp: '₹52,990.00',
                status: 'ProblemInInstallation', dealer: { name: 'AC Dealers Pvt Ltd', address: 'Rohini Sec 45', phone: '9133563214' },
                incident: {
                    status: 'Not Fixed', created: '1 day ago', description: "Product's display not working properly", scheduledDate: '11:00 AM, 24 May 2018',
                    engineer: { name: 'Mukesh Kumar', phone: '8965471235' },
                    commentByEngineer: 'IC 345 got burnt and diplay kit is in bad condition, Problem has been fixed temporarily, kit replacement is needed .',
                    fixDate: '10:40 AM, 25 Jun 2018',
                    rejectReason: 'Product is out of warranty',
                    images: ['https://res.cloudinary.com/bajajdigital/image/upload/v1484140564/ProductImages/zf7dqairb2lfzk9it9g1.jpg', 'https://ii1.pepperfry.com/media/catalog/product/l/g/494x544/lg-inverter-v-1-5-ton-cooling-only-bsa18ima--mosquito-away--split-air-conditioner-lg-inverter-v-1-5--n0ltgi.jpg']
                }
            },
            {
                img: 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/small_image/230x210/0dc2d03fe217f8c83829496872af24a0/3/2/320x400_thor.png',
                name: 'Aquaguard On The Go Avengers Series Thor', category: 'Water Purifiers', regDate: 'Oct 12,2015', purDate: 'Jun 4 2014', warranty: '1 years', regNo: 'AD12347', mrp: '₹650',
                status: 'Installed', dealer: { name: 'XYZ Dealers Pvt Ltd', address: 'Gurugram Sec 3', phone: '9833563214' },
                incident: {
                    status: 'Rejected', created: '1 day ago', description: "Product's display not working properly", scheduledDate: '11:00 AM, 24 May 2018',
                    engineer: { name: 'Mukesh Kumar', phone: '8965471235' },
                    rejectReason: 'Product is out of warranty',
                    images: ['https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/360x450/9df78eab33525d08d6e5fb8d27136e95/3/2/320x400_thor.png', 'https://5.imimg.com/data5/BI/PN/GLADMIN-22624322/aquaguard-on-the-go-avengers-series-thor-500x500.png']
                }
            },
            {
                img: 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/small_image/230x210/0dc2d03fe217f8c83829496872af24a0/e/u/eureka_forbes-wp-8664-min.jpg',
                name: 'Aquaguard Enhance Green RO', category: 'Water Purifiers', regDate: 'Sep 12,2016', purDate: 'Jun 4 2016', warranty: '2 years', regNo: 'AD12345', mrp: '₹25000',
                status: 'NotScheduled', dealer: { name: 'ABC Dealers Pvt Ltd', address: 'Noida Sec 3', phone: '9874563214' },
                incident: {
                    status: 'Rescheduled', created: '1 day ago', description: "Product's display not working properly", scheduledDate: '11:00 AM, 24 May 2018',
                    reScheduledDate: '11:00 AM, 24 May 2018',
                    engineer: { name: 'Mukesh Kumar', phone: '8965471235' },
                    rejectReason: 'Product is out of warranty',
                    images: ['https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/e/u/eureka_forbes-wp-7952-min.jpg', 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/u/eureka_forbes-wp-8657-min.jpg', 'https://cdn-live-wwf0uvrcwyr9hig.stackpathdns.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/u/eureka_forbes-wp-8669-min.jpg']
                }
            },
        ];
    }


    // requests related to report incident
    getRegisterdProducts() {
        return this.http.get('/c/complaint/registered-product');
    }

    getProductCategories(id: number) {
        return this.http.get(`/c/complaint/category/${id}`);
    }

    postIncident(data: any) {
        return this.http.post(`/c/complaint`, data);
    }

    postIncidentWithImg(data: any, image: any) {
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
        return transfer.upload(image, BASEURL + `/c/complaint`, options, false)
    }

    generateImageName() {
        //generate unique imagename based on current date-time(upto seconds)
        let date = new Date().toISOString();
        return 'IMG_' + date.substring(0, date.indexOf('.')) + '.jpg';
    }

}

