import {IOrderItem} from "./orders-types";

export interface IUserType {
    id: string,
    first_name: string,
    password: string,
    phone: string,
    "addresses"?: Array<string>,
    ordersHistory?: Array<IOrderItem>
}

export interface IEmployer {
    id: string,
    first_name: string,
    password: string,
    phone: string,
    "addresses"?: Array<string>,
    ordersHistory?: Array<IOrderItem>
}