import Router from 'koa-router';
import {productsRepository} from "../dal/products-repository";
import {ordersRepository} from "../dal/orders-repository";

const router = new Router({
    prefix: '/users'
});



router.get(`/`, async (ctx: any, next: any) => {
    const developers = await productsRepository.getProducts();
    ctx.body = developers;
});

router.get(`/:developerId/interviews`, async (ctx: any, next: any) => {
    // debugger;
    // const developers = await ordersRepository.getOrdersForAdmin(ctx.params.developerId);
    // ctx.body = developers;
});



export default router;