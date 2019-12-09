import jwt from 'jsonwebtoken';

module.exports = (req:any, res: any, next: ()=>void) => {
    try {
        // Express headers are auto converted to lowercase
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        let KEY = process.env.JWT_KEY ? process.env.JWT_KEY : "watsuuuup";
            req.userVeryfied = jwt.verify(token, KEY);
    } catch (err) {
        return res.status(401).json({
            message: 'Auth Failed'
        })
    }
    next();
};

// const User = require('../dal/models/User'),
//     mongoose = require('mongoose'),
//     checkCSRF = require('./checkCSRF'),
//     ObjectId = mongoose.Types.ObjectId;
//
// module.exports = function(req:any, res: any, next:any) {
//     let {user_id} = req.session;
//
//     if (!user_id) return res.status(401).json({error: 'You are not signed in.'});
//
//     try {
//         user_id = ObjectId(user_id); // Checking user_id not malformed.
//     } catch (err) {
//         res.clearCookie('BENS_TOKEN'); // Take away their silly cookie.
//
//         return res.status(401).json({error: "Your session is broken! Please sign-in again."});
//     }
//
//     // Malformed user_id down here throws error.
//     User.findById(user_id, (err:any, user:any) => {
//         if (err) return next(err);
//         if (!user) return res.status(401).json({error: 'Your user does not exist.'});
//
//         req.user = user;
//
//         checkCSRF(req, res, next);
//     });
// };