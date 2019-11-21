import Router from 'koa-router';
import {pizzasRepository} from "../dal/pizzas-repository";
import {ordersRepository } from "../dal/orders-repository";

const router = new Router({
    prefix: '/interviews'
});



router.get(`/`, async (ctx: any, next: any) => {
    const interviews = await ordersRepository.getOrdersForAdmin();
    ctx.body = interviews;
});

router.post(`/`, async (ctx: any, next: any) => {

    let interview = ctx.request.body as any;

    let dev = await ordersRepository.createOrder(interview.developerId);
    if (dev == null) {
        ctx.status = 406;
        return;
    }
    //
    // interview.id = "id" + (new Date()).getTime();
    // interview.developerName = dev.profile.firstName;
    // interview.date = new Date();
    // interview.companySummary = null;
    // interview.developerSummary = null;
    //
     const developers = await ordersRepository.createOrder(interview);
    ctx.body = developers;
});



export default router;