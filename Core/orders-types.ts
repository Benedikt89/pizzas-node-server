import {IPizzaItem, IPostOrderItem} from "./pizzas-types";

export interface ICommonOrder {
    phone: string,
    first_name: string,
    "delivery_date": string,
    "delivery_time": number,
    "address": string,
    "comment": string,
    "payment": number,
    "order_items": Array<IPostOrderItem>
}

export interface IOrderItem {
    id: string,
    phone: string,
    first_name: string,
    "delivery_date": string,
    "delivery_time": number,
    "address": string,
    "comment": string,
    "payment": number,
    "created": Date,
    "order_items": Array<IPizzaItem>
}