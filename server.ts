import express from "express";
const path = require('path');
import bodyParser from 'body-parser';
const session = require('express-session');
import cors from "cors";
const mongoose = require("mongoose");
import morgan from 'morgan';
const errorHandler = require('errorhandler');

import products from "./src/routers/products-router";
import users from "./src/routers/users-router";

//const csrf = require("csurf");
//const cookieParser = require("cookie-parser");

// setup route middlewares
//let csrfProtection = csrf({ cookie: true });
let parseForm = bodyParser.urlencoded({ extended: false });

//Database connections
mongoose.connect('mongodb://localhost/pizzas', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
});

export interface IExpressProps {
    error?: any,
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction
}

//Initiate app
const app: express.Application = express();

//Configure
//app.disable("x-powered-by");


app.use(cors());
app.use(session({
    key: "session",
    secret: 'pizzashop-aaaa',
    cookie: { maxAge: 60000,
        secure: false},
    resave: false,
    saveUninitialized: false
}));
//app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//local Static Files
app.use(express.static(__dirname + '/static'));
app.use('/static/images', express.static(__dirname + '/static/images'));

//app.set('trust proxy', 1); // trust first proxy

//app.use(errorHandler())


// parse cookies
// we need this because "cookie" is true in csrfProtection
// app.use(cookieParser());
// app.use(csrf({ cookie: true }));


//sendStatic
app.get('/', (req:any, res:any) => {
   // res.sendFile(__dirname + '/static/index.html', { csrfToken: req.csrfToken() });
    res.sendFile(__dirname + '/static/index.html');
});

//routers

app.use('/users', users);
app.use('/pizzas', products);
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

//
// app.use((req:any, res:any, next:any) => {
//     if (!res.data) {
//         return res.status(404).send({
//             status: false,
//             error: {
//                 reason: "Invalid Endpoint",
//                 code: 404
//             }
//         });
//     }
//     if(req.newSessionRequired && req.session.userData){
//         try{
//             res.setHeader('session-token',
//                 generateJWTToken(req.session.userData));
//             res.data['session-token'] = generateJWTToken(req.session.userData);
//         }catch(e){
//             console.log('e:',e);
//         }
//     }
//
//     if (req.session && req.session.sessionID) {
//         try {
//             res.setHeader('session-token', req.session.sessionID);
//             res.data['session-token'] = req.session.sessionID;
//         } catch (e) {
//             console.log('Error ->:', e);
//         }
//     }
//     res.status(res.statusCode || 200)
//         .send({ status: true, response:res.data });
// })

app.listen(8000, () => {
    console.log('App listening port 8000')
});