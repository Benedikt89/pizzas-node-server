import Koa from "koa";
import koaBody from "koa-body";
import pizzasRouter from "./routers/pizzas-router";
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
    .use(pizzasRouter.routes())
    .use(usersRouter.routes())
    .use(ordersRouter.routes());

app.listen(8000);
