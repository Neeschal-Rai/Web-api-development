const Json_token = require('jsonwebtoken');
const Users = require('../models/userModel');



module.exports.verifyUser = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const data = Json_token.verify(token, 'anysecretkey');

    
        Users.findOne({ _id: data.userId })
            .then(function(result) {
                req.userData = result;
                next()
            })
            .catch(function(error) {
                res.status(401).json({ error: error })
            })
    } catch (error) {
        res.status(401).json({ error: error })
    }
}
