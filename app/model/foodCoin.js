const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const History = require('../model/history');

const data = require('../config/index');
const model = new Schema({
        foodcoin: Number,
        mobile: String,
        isActive: {type: Boolean, default: true},
        data: {type: Date, default: Date.now}
    },{
    toJSON: {
        transform: function (doc, ret) {},
    },
    toObject: {
        transform: function (doc, ret) {},
        virtuals: false
    },
    createRestApi: true,
    strict: false
});

mongoose.model('foodCoin', model);

const glob = require('glob');

const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next()
};
const preUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next()
};
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    req.body.mobile = parseMobile(req.body.mobile).slice(-10);
    mongoose.model('user')
        .findOneAndUpdate({mobile:req.body.mobile.slice(-10)},{$inc:{foodcoin:req.body.foodcoin}})
        .exec((e,r)=>{
            if (e) return res.badRequest(e);
            if (!r) next();
            if (r) {
                res.ok({mess:'Успішно нараховано!'})
                let coment = 'Вам нараховано '+ parseInt(req.body.foodcoin)+' бонусних FoodCoin системою Taste of Life! Смачного!';
                const obj = {
                    "foodcoin": parseInt(req.body.foodcoin),
                    "userShow": r._id,
                    "type": "foodcoin",
                    "est": "Taste of Life",
                    "coment": coment
                }
                //console.log('!!!Working!!!')
                const h = new History(obj);
                h.save();

            }
        });
    // next()
};
const parseMobile = str =>{
    var b = '';
    str.match(/\d+/ig).map(i => {
        b = b + String(i);
    })
    return b
};
const preDelete = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next()
};
glob.restify.serve(
    glob.route,
    mongoose.model('foodCoin'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getAdmin, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getAdmin, preCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getAdmin, preDelete]
    });