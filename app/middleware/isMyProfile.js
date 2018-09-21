const mongoose = require('mongoose');
const glob = require('glob');

glob.isMyProfile = (req,res,next)=>{
    require("express");
    require("../responces/serverError")(req, res);
    require("../responces/forbidden")(req, res);
    const jwt = require('jsonwebtoken');
    const User = mongoose.model('user');
    const protect = req.headers["authorization"];
    if(!protect){
        return res.forbidden("forbidden3");
    }
    const connect = protect.split(" ");

    jwt.verify(connect[0], glob.secret, (err,data)=>{
        if (err) {
            return res.serverError("Token error");
        }else{
            let id = req.params.id || req.body.id || req.body.userId;
            User.findOne({_id: id})
                .exec((err, info)=>{
                    if (err) return next(err);
                    if (!info) return res.forbidden("forbidden1");
                    if (info.login != data.id){
                        req.license = false;
                        return next();
                    }
                    req.userId = info._id;
                    req.license = true;
                    // req.avatar = info.avatar;
                    next()
                });
        }
    });
};