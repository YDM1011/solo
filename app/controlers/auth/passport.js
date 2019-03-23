'use strict';

var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const md5 = require('md5');
const glob = require('glob');
const data = require('../../config/index');
const time = 365 * 24 * 3600000;

module.exports.generateToken = async (req, res, next) => {
    let userData = await findUser(req,res);
    if (userData){
        return await setCooki(req,res,userData);
    }else{
       let userNew = await createUser(req,res);
       if (userNew){
           return await setCooki(req,res,userNew);
       } else{
           res.badRequest()
       }
    }
};

module.exports.config = () => {
    passport.use(new Strategy( data.facebook,
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
    return new Promise((resolve,reject)=>{
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
    return new Promise((resolve,reject)=>{
        const pass = generatePassword();
        console.log(req.auth);
        let info = {
            login: req.auth.id,
            pass: md5(pass),
            verify: true,
            token: jwt.sign({id: req.auth.id}, glob.secret),
            firstName: req.auth.firstName,
            lastName: req.auth.lastName,
        };
        User.create(info, (err, content) => {
            console.log("1",content);
            if (err) return res.status(500).send({error:err});
            if (!content) resolve(null);
            if (content){
                delete content.hash;
                resolve(content);
            }
        })
    });
};

const setCooki = (req,res, info)=>{
    res.cookie('sid',info.token,
        {
            domain: data.auth.sidDomain,
            path:"/",
            maxAge: time,
            httpOnly: true
        });
    res.cookie('userid', String(info._id),
        {
            domain: data.auth.sidDomain,
            path:"/",
            maxAge: time,
            httpOnly: false
        });
    res.redirect(`${data.auth.afterAuthDomain}/user/${info._id}`);
    // res.ok({_id:});
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