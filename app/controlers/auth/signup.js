const jwt = require('jsonwebtoken');
const glob = require('glob');
const email = require('../email');
const md5 = require('md5');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const generatePassword = () => {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};
module.exports.create = (req, res, next) => {
    collectRequestData(req,"signup",(elem)=> {
        req.body = JSON.parse(elem);
        User
            .findOne({login: req.body.login})
            .exec((err, info) => {
                if (err) return res.status(500).send({err: 'Something broke!'});
                if (info) return res.status(200).send({err: 'login in use'});
                const hash = generatePassword();
                info = req.body;
                info['email'] = req.body.login;
                info.hash = hash;
                info.pass = md5(hash);
                info.token = jwt.sign({id: req.body.login}, glob.secret);
                User.create(info, (err, content) => {
                    if (err) {
                        res.send(err)
                    } else {
                        email.sendMail({
                            mail: req.body.login,
                            hash: hash
                        });
                        delete content.hash;
                        res.send(content)
                    }
                })
            });
    });
    // res.send(JSON.stringify({res:req.body.login}) );
};
module.exports.confirm = (req, res, next) => {
    collectRequestData(req,'confirm',(elem)=> {
        req.body = JSON.parse(elem);
        User
            .findOne({login: req.body.login})
            .exec((err, info) => {
                if (err) return res.status(500).send({err: 'Something broke!'});
                if (!info) return res.status(200).send({err: 'Bad request'});
                if (info.hash == req.body.hash) {
                    User.findOneAndUpdate({login: req.body.login},
                        {verify: true})
                        .exec((err, doc) => {
                            if (err) return res.status(500).send({err: 'Something broke!'});
                            if (!doc) return res.status(400).send({err: 'Bad request'});
                            if (doc) {
                                res.ok(doc)
                            }
                        })
                }

            });
    });
    // res.send(JSON.stringify({res:req.body.login}) );
};


function collectRequestData(request, type, call) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            if(type == 'signup'){
            request.body = JSON.stringify({
                login: String(body).split('name="login"\r\n\r\n')[1].split('\r\n')[0],
                firstName: String(body).split('name="firstName"\r\n\r\n')[1].split('\r\n')[0],
                lastName: String(body).split('name="lastName"\r\n\r\n')[1].split('\r\n')[0]
            });
            call(request.body)}
            if(type == 'confirm'){
            request.body = JSON.stringify({
                login: String(body).split('name="login"\r\n\r\n')[1].split('\r\n')[0],
                firstName: String(body).split('name="firstName"\r\n\r\n')[1].split('\r\n')[0],
                lastName: String(body).split('name="lastName"\r\n\r\n')[1].split('\r\n')[0]
            });
            call(request.body)}
        });
    }
}