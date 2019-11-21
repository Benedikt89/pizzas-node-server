import Router from 'koa-router';
import {pizzasRepository} from "../dal/pizzas-repository";
import {ordersRepository} from "../dal/orders-repository";

const router = new Router({
    prefix: '/developers'
});



router.get(`/`, async (ctx: any, next: any) => {
    const developers = await pizzasRepository.getDevelopers();
    ctx.body = developers;
});

router.get(`/:developerId/interviews`, async (ctx: any, next: any) => {
    // debugger;
    const developers = await ordersRepository.getInterviewsForDeveloper(ctx.params.developerId);
    ctx.body = developers;
});



export default router;