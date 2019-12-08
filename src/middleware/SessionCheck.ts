import {IExpressProps} from "../../server";

module.exports = (req:any, res:any, next:any) => {
    let sess;

    if (!req.session) {

    }
    sess = req.session;
    sess.phone = req.body.phone;

    next();
};