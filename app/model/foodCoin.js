const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data = require('../config/index');
const model = new Schema({
        foodcoin: Number,
        mobile: String,
        data: {type: Date, default: new Date()}
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
    req.body = req.body.mobile.slice(-10);
    mongoose.model('user')
        .findOneAndUpdate({mobile:req.body.mobile.slice(-10)},{foodcoin:req.body.foodcoin})
        .exec((e,r)=>{
            if (e) return res.badRequest(e);
            if (!r) next();
            if (r) res.ok({mess:'Успішно нараховано!'})
        });
    // next()
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