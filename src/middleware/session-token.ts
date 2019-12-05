import {usersRepository} from "../dal/users-repository";
const jwt = require('jsonwebtoken');

const newSessionRoutes = [{ path: '/user/login', method: 'POST' }];
const authRoutes = [{ path: '/user/password', method: 'PUT' }];
const SECRET_KEY = process.env.JWT_KEY;

export const clientApiKeyValidation = async (req:any, res:any, next:any) => {
    let clientApiKey = req.get('api_key');
    if(!clientApiKey){
        return res.status(400).send({
            status:false,
            response:"Missing Api Key"
        });
    }
    try {
        const user = req.body;
        let clientDetails = await usersRepository.getUser(user);
        if (clientDetails) {
            next();
        }
    } catch (e) {
        console.log('%%%%%%%% error :', e);
        return res.status(400).send({
            status: false,
            response: "Invalid Api Key"
        });
    }
}
export const isNewSessionRequired = (httpMethod: any, url:string) => {
    for (let routeObj of newSessionRoutes) {
        if (routeObj.method === httpMethod && routeObj.path === url) {
            return true;
        }
    }
    return false;
}
export const isAuthRequired = (httpMethod: any, url:string) => {
    for (let routeObj of authRoutes) {
        if (routeObj.method === httpMethod && routeObj.path === url) {
            return true;
        }
    }
    return false;
}

export const generateJWTToken = (userData:any) =>{
    return jwt.sign(userData, SECRET_KEY);
}

export const verifyToken = (jwtToken:any) =>{
    try{
        return jwt.verify(jwtToken, SECRET_KEY);
    }catch(e){
        console.log('e:',e);
        return null;
    }
}