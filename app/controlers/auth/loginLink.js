const jwt = require('jsonwebtoken');
const glob = require('glob');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const md5 = require('md5');
const data = require('../../config/index');
const time = 365 * 24 * 3600000;
const History = require('../../model/history');

module.exports = (req, res, next) => {
    let login = req.params.login.toLowerCase();
    let hashLink = req.params.hashLink;
    User
        .findOne({login: login})
        .exec((err, info)=>{
            if (err) return res.status(500).send({error:'Something broke!'});
            if (!info) return res.notFound({error:'link invalid'});
            if (info.hashLink === hashLink){
                if(!info.verify){
                    User.findOneAndUpdate({login: login}, {verify: true})
                        .exec()
                    let coment = 'Бонус реєстрації! Вам нараховано 10 FoodCoin!';
                    const obj = {
                        "foodcoin": 10,
                        "userShow": info._id,
                        "type": "foodcoin",
                        "est": "Taste of Life",
                        "coment": coment
                    }
                    //console.log('!!!Working!!!')
                    const h = new History(obj);
                    h.save();
                }
                // const token = jwt.sign({ id: login }, glob.secret);
                // info.pass = req.body.pass;
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
                res.redirect(`${data.auth.afterAuthDomain}/user/${info._id}`);
                // res.ok({_id:`${data.auth.afterAuthDomain}/user/${info._id}`});

            }else{
                return res.status(400).send({error:'link invalid'});
            }
        });
};
