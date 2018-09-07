// module.exports = (req,res,next)=>{
//     console.log(req.headers['Authorization']);
//     next()
// };
const mongoose = require('mongoose');
const glob = require('glob');

glob.isAuth = (req,res,next)=>{
    const jwt = require('jsonwebtoken');
    const User = mongoose.model('user');
    const protect = req.headers["authorization"];
    const connect = protect.split(" ");
    jwt.verify(connect[0], glob.secret, (err,data)=>{
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }else{
            console.log(data.id);
            User.findOne({login: data.id })
                .exec((err, info)=>{
                    if (err) return next(err);
                    if (!info) return res.status(403).send({err:'forbidden'});
                    next()
                });
        }
    });
};