const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req,res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("Access denied. No token provided");
    try{
        const verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = verified;
        next();
    }
    catch(err){
        res.status(400).send("Invalid token.");
    }
}