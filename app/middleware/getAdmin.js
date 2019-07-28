const mongoose = require('mongoose');
const glob = require('glob');

glob.getAdmin = (req,res,next)=>{
    require("express");
    require("../responces/serverError")(req, res);
    require("../responces/forbidden")(req, res);
    const jwt = require('jsonwebtoken');
    const User = mongoose.model('user');
    const protect = req.cookies['adminsid'];

    if(!protect){
        return res.forbidden("forbidden you are not admin!");
    }
    const connect = protect.split(" ");

    jwt.verify(connect[0], glob.secret, (err,data)=>{
        if (err) {
            return res.serverError("Token error");
        }else{
            //if (data.id !== "5c521f824d044903484c5dad" ) return res.forbidden("forbidden admin`s login invalid!");
            if (data.id !== "admin" ) return res.forbidden("forbidden admin`s login invalid!");
            User.findOne({login: data.id })
                .exec((err, info)=>{
                    if (err) return next(err);
                    if (!info) return res.forbidden("forbidden2");
                    req.adminLogin = data.id;
                    // req.avatar = info.avatar;
                    next()
                });
        }
    });
};