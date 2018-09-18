const jwt = require('jsonwebtoken');
const glob = require('glob');
const data = require('../../config/index');
const md5 = require('md5');
const mongoose = require('mongoose');
const User = mongoose.model('user');
module.exports = (req, res, next) => {

    User
        .findOne({login: req.body.login})
        .exec((err, info) => {
            if(err) return res.status(500).send({err:'Something broke!'});
            if(info) return res.status(200).send({err:'login in use'});
            info = req.body;
            info.pass = md5(req.body.pass);
            info.token = jwt.sign({ id: req.body.login }, glob.secret);
            User.create(info, (err, content) =>{
                if(err) {
                    res.send(err)
                } else {
                    res.send(content)
                }
            })
        });

    // res.send(JSON.stringify({res:req.body.login}) );
};