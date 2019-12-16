import express, {NextFunction, Request, Response} from "express";
//const path = require('path');
import bodyParser from 'body-parser';
const session = require('express-session');
import cors from "cors";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import morgan from 'morgan';

// setup routers
import products from "./src/routers/products-router";
import users from "./src/routers/users-router";

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

//adding session cookies
app.use(session({
    secret: 'ssshhhhh',
    name: 'SESSION_TOKEN',
    maxAge: 60000,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
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
app.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/static/index.html');
});



//Error handlers & middlewares
app.use((req: Request, res: Response, next: NextFunction)=>{
    const error = new Error("not found");
    // @ts-ignore
    error.status = 404;
    next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction)=>{
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