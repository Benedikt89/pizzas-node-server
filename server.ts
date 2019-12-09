import express from "express";
//const path = require('path');
import bodyParser from 'body-parser';
const session = require('express-session');
import cors from "cors";
import cookieParser from 'cookie-parser';
const mongoose = require("mongoose");
import morgan from 'morgan';



// setup route middlewares
import products from "./src/routers/products-router";
import users from "./src/routers/users-router";


export interface IExpressProps {
    error?: any,
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction
}


//Database connections
mongoose.connect('mongodb://localhost/pizzas', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
});

const corsOptions = {
    origin: true,
    credentials: true,
};

//Initiate app
const app: express.Application = express();


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'ssshhhhh',
    name: 'BENS_TOKEN',
    maxAge: 60000,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: false
    }
}));

//routers
app.use('/users', users);
app.use('/pizzas', products);

//Configure
app.disable("x-powered-by");


//local Static Files
app.use(express.static(__dirname + '/static'));
app.use('/static/images', express.static(__dirname + '/static/images'));


//sendStatic
app.get('/', (req:any, res:any) => {
    res.sendFile(__dirname + '/static/index.html');
});


//Error handlers & middlewares
app.use((req: express.Request, res: express.Response, next: express.NextFunction)=>{
    const error = new Error("not found");
    // @ts-ignore
    error.status = 404;
    next(error);
});

app.use(({error, req, res, next}:IExpressProps)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});

app.listen(8000, () => {
    console.log('App listening port 8000')
});