const jwt = require('jsonwebtoken');
const glob = require('glob');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const md5 = require('md5');

module.exports = (req, res, next) => {

    User
        .findOne({login: req.body.login})
        .exec((err, info)=>{
            if (err) return res.status(500).send({err:'Something broke!'});
            if (!info) return res.notFound({err:'login or password invalid'});
            if (info.pass === md5(req.body.pass)){
                const token = jwt.sign({ id: req.body.login }, glob.secret);
                res.json({res: token});
            }else{
                return res.status(400).send({err:'login or password invalid'});
            }
        });
};