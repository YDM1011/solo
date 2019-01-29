'use strict';

var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const md5 = require('md5');
const glob = require('glob');

module.exports.generateToken = (req, res, next) => {
    console.log("ok",req.auth);
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

/**
 * @function createUser
 * @function findUser
 * @function generatePassword
 * @param req
 * @param res
 */
const findUser = (req,res) =>{
    new Promise((resolve,reject)=>{
        User
            .findOne({login: req.auth.id})
            .exec((err, info)=>{
                if (err) return res.status(500).send({error:err});
                if (!info) return resolve(null);
                if (info) return resolve(info);
            })
    });
};

const createUser = (req,res)=>{
    new Promise((resolve,reject)=>{
        const pass = generatePassword();
        let info = {
            login: req.user.id,
            pass: md5(pass),
            token: jwt.sign({id: req.user.id}, glob.secret),
            firstName: req.user.firstName,
            lastName: req.user.lastName,
        };

        User.create(info, (err, content) => {
            if (err) {
                res.send(err)
            } else {
                delete content.hash;
                resolve(content);
            }
        })
    });
};

const generatePassword = () => {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};