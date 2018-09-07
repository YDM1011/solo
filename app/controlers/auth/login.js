const jwt = require('jsonwebtoken');
const glob = require('glob');
const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = (req, res, next) => {

    User
        .findOne({login: req.body.login})
        .exec((err, info)=>{
            if (err) return res.status(500).send({err:'Something broke!'});
            if (!info) return res.status(200).send({err:'login or password invalid'});

        });

    const token = jwt.sign({ id: req.body.pass }, glob.secret);
    res.json({res: token});
};