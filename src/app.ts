import Koa from "koa";
import koaBody from "koa-body";
import productsRouter from "./routers/products-router";
import usersRouter from "./routers/users-router";
import ordersRouter from "./routers/orders-router";
import cors from "@koa/cors";

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/pizzas', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
});

const app = new Koa();

app
    .use(cors())
    .use(koaBody())
    .use(productsRouter.routes())
    .use(usersRouter.routes())
    .use(ordersRouter.routes())
    .use((ctx: any, next: any)=>{
        const error = new Error("Not Found");
        // @ts-ignore
        error.status(404);
        next(error);
    })
    .use(async (ctx:any, next: any) => {
        try {
            await next();
        } catch (err) {
            // will only respond with JSON
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = {
                message: err.message
            };
        }
    });
app.listen(8000);
