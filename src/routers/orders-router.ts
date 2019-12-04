import {ordersRepository} from "../dal/orders-repository";

const express = require("express");
const router = express.Router();



router.get(`/`, async (req:any, res:any, next:any) => {
    const interviews = await ordersRepository.getOrdersForAdmin();
});

export default router;