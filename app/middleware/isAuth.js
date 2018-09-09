const mongoose = require('mongoose');
const glob = require('glob');

glob.isAuth = (req,res,next)=>{
    require("../responces/serverError")(req, res);
    require("../responces/forbidden")(req, res);
    const jwt = require('jsonwebtoken');
    const User = mongoose.model('user');
    const protect = req.headers["authorization"];
    const connect = protect.split(" ");

    jwt.verify(connect[0], glob.secret, (err,data)=>{
        if (err) {
            return res.serverError("Token error");
        }else{
            console.log(data.id);
            User.findOne({login: data.id })
                .exec((err, info)=>{
                    if (err) return next(err);
                    if (!info) return res.forbidden("forbidden");
                    req.userId = info._id;
                    next()
                });
        }
    });
};