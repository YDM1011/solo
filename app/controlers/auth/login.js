const jwt = require('jsonwebtoken');
const glob = require('glob');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const md5 = require('md5');
const data = require('../../config/index');
const qs = require('querystring');
var time = 14 * 24 * 3600000;
module.exports = (req, res, next) => {
    console.log(req.body);
    collectRequestData(req,(elem)=>{
        console.log(elem)
    });
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
                res.cookie('userid', String(info._id),
                    {
                        domain: data.auth.sidDomain,
                        path:"/",
                        maxAge: time,
                        httpOnly: false
                    });
                res.ok(info);
            }else{
                return res.status(400).send({error:'login or password invalid'});
            }
        });
};

function collectRequestData(request, call) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            var obj = {
                login: post.login,
                pass: post.pass
            };
            call(obj)
        });
    }
}