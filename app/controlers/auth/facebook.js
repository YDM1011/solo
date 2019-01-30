var passportData = require('./passport');
var passport = require('passport');

passportData.config();

module.exports.mdlAuth = (req, res, next) => {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
        id: req.user.id,
        firstName: req.user._json.first_name,
        lastName: req.user._json.last_name,
    };
    passportData.generateToken(req, res, next);
};
