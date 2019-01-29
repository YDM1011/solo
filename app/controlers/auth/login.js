const jwt = require('jsonwebtoken');
const glob = require('glob');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const md5 = require('md5');
const data = require('../../config/index');
const qs = require('querystring');
const time = 365 * 24 * 3600000;
module.exports = (req, res, next) => {
    collectRequestData(req,(elem)=>{
        req.body = JSON.parse(elem);
        console.log(req.body);
    User
        .findOne({login: req.body.login})
        .exec((err, info)=>{
            if (err) return res.status(500).send({error:'Something broke!'});
            if (!info) return res.notFound({error:'login or password invalid'});
            if (info.pass === md5(req.body.pass)){
                if(!info.verify){
                    User.findOneAndUpdate({login: req.body.login}, {verify: true})
                        .exec()
                }
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
                if(data.auth.sidDomain === "localhost"){
                    res.ok({_id:'http://localhost:4200/user/'+info._id});
                }else{
                    res.ok({_id:'/user/'+info._id});
                }

            }else{
                return res.status(400).send({error:'login or password invalid'});
            }
        });
    });
};

function collectRequestData(request, call) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            request.body = JSON.stringify({
                login: String(body).split('name="login"\r\n\r\n')[1].split('\r\n')[0],
                pass: String(body).split('name="pass"\r\n\r\n')[1].split('\r\n')[0]
            });
            call(request.body)
        });
    }
}