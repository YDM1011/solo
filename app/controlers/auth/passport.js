'use strict';

var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var jwt = require('jsonwebtoken');
  // FacebookTokenStrategy = require('passport-facebook-token');
  // User = require('mongoose').model('User');

const createToken = auth => {
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};
module.exports.generateToken = (req, res, next) => {
    console.log(req.auth);
    req.token = createToken(req.auth);
    sendToken(req,res)
};

const sendToken = (req, res) => {
    res.setHeader('x-auth-token', req.token);
    res.status(200).send(req.auth);
};
module.exports.config = () => {

    passport.use(new Strategy({
            clientID: '184817025491397',
            clientSecret: '2df9691f43afef29b27e7361f5e0256c',
            callbackURL: 'http://localhost:5000/api/facebook/return',
            profileFields: ["id", "displayName", "picture", "email", "first_name", "last_name"]
        },
        function(accessToken, refreshToken, profile, cb) {
            // console.log(accessToken, refreshToken, profile);
            return cb(null, profile);
        }));
};