export interface Product {
    billNumber: string;
    billPicUrl: string;
    customerContactNo: string;
    customerEmail: string;
    customerId: number;
    customerName: string;
    customerPicUrl: string;
    dealerContact: string;
    dealerName: string;
    id: number;
    installationDateTime: string;
    productBarcode: string;
    productBrand: string;
    productId: 1;
    productModelNumber: string;
    productCategoryId:number;
    productName: string;
    productPicUrl: string;
    productType: string;
    purchaseDate: string;
    registeredAt: string;
    verified: boolean;
    warrantyPeriodEnd: string;
    warrentyPeriodStart: string;
};

export interface Address{
    addressType: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: number | string;
    phone: number | string;
    id?:number | string
}
