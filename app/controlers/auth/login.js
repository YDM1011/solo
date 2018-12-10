const jwt = require('jsonwebtoken');
const glob = require('glob');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const md5 = require('md5');
const data = require('../../config/index');
var time = 14 * 24 * 3600000;
module.exports = (req, res, next) => {
    User
        .findOne({login: req.body.login})
        .exec((err, info)=>{
            if (err) return res.status(500).send({error:'Something broke!'});
            if (!info) return res.notFound({error:'login or password invalid'});
            if (info.pass === md5(req.body.pass) && info.verify){
                const token = jwt.sign({ id: req.body.login }, glob.secret);
                info.pass = req.body.pass;
                res.cookie('sid',info.token,
                    {
                        domain: data.auth.sidDomain,
                        path:"/",
                        maxAge: time,
                        httpOnly: true
                    });
                res.ok(info);
            }else{
                return res.status(400).send({error:'login or password invalid'});
            }
        });
};
