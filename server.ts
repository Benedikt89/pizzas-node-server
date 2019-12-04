import express from "express";
import cors from "cors";
import morgan from 'morgan';
import products from "./src/routers/products-router";
import users from "./src/routers/users-router";
import bodyParser from 'body-parser';

//Database connections
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/pizzas', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
});

const options:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: false,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "http://127.0.0.1:3000/",
    preflightContinue: false
};

const app: express.Application = express();
app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//local Static Files
app.use(express.static(__dirname + '/static'));
app.use('/static/images', express.static(__dirname + '/static/images'));

//sendStatic
app.get('/', (req:any, res:any)=>{
    res.sendFile(__dirname + '/static/index.html');
});

//routers
app.use('/pizzas', products);
app.use('/users', users);

//middleware
app.use((req:any, res:any, next:any)=>{
    const error = new Error("not found");
    // @ts-ignore
    error.status = 404;
    next(error);
});

app.use((error:any, req:any, res:any, next:any)=>{
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