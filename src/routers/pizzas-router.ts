import Router from 'koa-router';
import {pizzasRepository} from "../dal/pizzas-repository";
import {IPizzaToCreate} from "../../Core/pizzas-types";

const router = new Router({
    prefix: '/pizzas'
});

router.get('/', async (ctx: any, next: any)=>{
    const pizzas = await pizzasRepository.getPizzas();
    ctx.body = pizzas;
    console.log('getPizzas');
});
router.post(`/`, async (ctx: any, next: any) => {
    const newPizza = ctx.request.body.formData as IPizzaToCreate;
    const createdPizza = await pizzasRepository.addPizza(newPizza);
    ctx.body = createdPizza;
});

export default router;