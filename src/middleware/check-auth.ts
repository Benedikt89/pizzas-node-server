const jwt = require('jsonwebtoken');

module.exports = (req:any, res: any, next:any) => {
    try {
        // Express headers are auto converted to lowercase
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        req.userVeryfied = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
        return res.status(401).json({
            message: 'Auth Failed'
        })
    }
    next();
};