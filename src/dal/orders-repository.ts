import {IOrderItem} from "../../Core/orders-types";
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String
});
const User = mongoose.model('Users', userSchema);

const fakeInterviews: Array<IOrderItem> = [
    {
        id: "1212",
        phone: "1",
        first_name: "Dmitry",
        delivery_date: "1",
        delivery_time: 1,
        address: 'string',
        comment: "Cool developer but dont know css",
        payment: 1,
        created: new Date(),
        order_items: []
    },
    {
        id: "12ssdasd12",
        phone: "1231231231",
        first_name: "Dmiasdtry",
        delivery_date: "2241241231",
        delivery_time: 1,
        address: 'string',
        comment: "Cool developer but dont know css",
        payment: 2,
        created: new Date(),
        order_items: []
    }
];


export const ordersRepository = {

    getOrdersForAdmin (orderId?: string): Promise<Array<IOrderItem>> {
        return Promise.resolve<Array<IOrderItem>>(fakeInterviews.filter(i => i.id === orderId));
    },
    createOrder(interview: IOrderItem) {
        fakeInterviews.push(interview);
    }

};