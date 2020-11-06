const jwt = require('jsonwebtoken');

var secret_key = 'secret_key_student';

module.exports = (req, res, next) => {
    
    try{
        // console.log(req.body.authorization)
        var token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret_key);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
};