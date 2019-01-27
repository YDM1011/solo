var passportData = require('./passport');
var passport = require('passport');

passportData.config();

module.exports.mdlAuth = (req, res, next) => {
    console.log(req.user._json);
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
        id: req.user.id
    };
    passportData.generateToken(req, res, next);
};
