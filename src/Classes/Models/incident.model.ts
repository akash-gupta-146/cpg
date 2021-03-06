export interface Incident {
    againstCategoryId: number;
    againstCategoryName: string;
    assignedEmployeeId: number;
    assignedEmployeeName: string;
    assignedEmployeePicUrl: string;
    assignedServiceEngineerId:number;
    assignedServiceEngineerName: string;
    assignedServiceEngineerNickName: string;
    assignedServiceEngineerPicUrl: string;
    assignedServiceEngineerContactNo:string | number;
    assignedServiceEngineerEmail:string;
    billNumber: string;
    closedOn:string;
    createdAt: string;
    customerContactNo:string | number;
    customerEmail: string;
    customerId:number;
    customerName: string;
    dealerContact: string;
    dealerName: string;
    description: string;
    id:number;
    isProductVerified:boolean;
    priority: string;
    productBillUrl: string;
    productInstallationDateTime: string;
    productModelNumber: string;
    productBrand:string;
    productName: string;
    productPicUrl:string;
    productPurchaseDate: string;
    productRegistrationId:number | string;
    productWarrantyEnd: string;
    productWarrantyStart: string;
    registeredProductPicUrl:string;
    rating:number;
    rca: string;
    reopenCount:number;
    statusColor: string;
    statusId:number;
    statusName: string;
    title: string;
    complaintPicUrl:string;
    lastModifiedAt:string;
    lastScheduleDate:string;
};