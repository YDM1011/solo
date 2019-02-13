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
        return next()
    }
    const connect = protect.split(" ");

    jwt.verify(connect[0], glob.secret, (err,data)=>{
        if (err) {
            return res.serverError("Token error");
        }else{
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