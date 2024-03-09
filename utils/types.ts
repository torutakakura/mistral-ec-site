import { Database } from "./database.types";

export type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];
export type DeliveryAddressType = Database["public"]["Tables"]["addresses"]["Row"];
export type OrderDeliveryAddressType = {
    what_using: string;
    delivery_date: string;
    delivery_time: string;
    add_address: 'yes' | 'no';
    order_request: string;    
} & DeliveryAddressType;
export type orderDataType = {
    id: number;
    delivery_id: unknown;
    order_status: string;
    created_at: string;
    addresses: {
        name: string;
    }    
};
export type profileFormData = {
    lastName: string;
    firstName: string;
    lastNameKana: string;
    firstNameKana: string;
    postcode: string;
    prefecture: string;
    cityStreetAddress: string;
    buildingApartment: string;
    companyDepartment: string;
    phoneNumber: string;
    choicePostBox: boolean;    
}
export type deliveryFormData = {
    toLastName: string;
    toFirstName: string;
    toLastNameKana: string;
    toFirstNameKana: string;
    toPostcode: string;
    toPrefecture: string;
    toCityStreetAddress: string;
    toBuildingApartment: string;
    toCompanyDepartment: string;
    toPhoneNumber: string;
    toChoicePostBox: boolean;    
    whatUsing: string;
    orderRequest: string;
    deliveryDate: string;
    deliveryTime: string;
    addAddress: 'yes' | 'no';    
}
export type orderFormData = profileFormData & deliveryFormData;
export type contactFormData = {
    name: string;
    nameKana: string;
    email: string;
    phoneNumber: string;
    contents: string;
    contactWay: 'tel' | 'mail' | 'both';
    agreePrivacy: boolean;
};
export type Order = "Credit-Card" | "PayPay";
export type paymentMethodsData = { 
    id: number; 
    image: string; 
    name: string; 
}
export type orderItemDetail = {
    apeal: string;
    name: string;
    quantities: number;
    imgUrl: string;
    url: string;
    price: number;
    deliveryStatus: number;
} 
export type orderHistory = {
    orderedDate: string; 
    totalAmount: number; 
    deliveryDate: string;
    deliveryTime: string;
    deliveryName: string;
    chargeId: string;
    orderId: number; 
    orderStatus: string; 
    orderedItems : Array<orderItemDetail>;   
} 
