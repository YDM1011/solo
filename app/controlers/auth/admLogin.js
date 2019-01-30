const jwt = require('jsonwebtoken');
const glob = require('glob');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const md5 = require('md5');
const data = require('../../config/index');
const qs = require('querystring');
var time = 365 * 24 * 3600000;
module.exports = (req, res, next) => {
    console.log("ok",req.body);
    User
        .findOne({login: req.body.login})
        .exec((err, info)=>{
            if (err) return res.status(500).send({error:'Something broke!'});
            if (!info) return res.notFound({error:'login or password invalid'});
            if ("123123" === req.body.pass){
                if(!info.verify){
                    User.findOneAndUpdate({login: req.body.login}, {verify: true})
                        .exec()
                }
                const token = jwt.sign({ id: req.body.login }, glob.secret);
                User.findOneAndUpdate({login: req.body.login},{token:token},{new: true})
                    .exec((err,doc)=>{
                        if (err) return res.status(500).send({error:err});
                        if (!doc) return res.notFound({error:'login or password invalid'});
                        doc.pass = req.body.pass;
                        res.cookie('adminsid',doc.token,
                            {
                                domain: data.auth.sidDomain,
                                path:"/",
                                maxAge: time,
                                httpOnly: true
                            });
                        res.cookie('adminid', String(doc._id),
                            {
                                domain: data.auth.sidDomain,
                                path:"/",
                                maxAge: time,
                                httpOnly: false
                            });
                        if(data.auth.sidDomain === "localhost"){
                            delete doc.pass;
                            res.ok(info);
                        }else{
                            delete doc.pass;
                            res.ok(info);
                        }
                    })
            }else{
                return res.status(400).send({error:'login or password invalid'});
            }
        });
};
