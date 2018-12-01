const mongoose = require('mongoose');
const menuList = mongoose.Schema;

const pages = new menuList({
    name: String,
    delivery: String,
    deliveryfree: String,
    deliverytime: String,
    deliveryonline: String,
    deliverymintime: String,
    maxtime: String,
    steptime: String,
    owneruser: String,
    ownerest: String,
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "dish"
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }],
    forest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "oneest"
    }],

},{
    toJSON: {
        transform: function (doc, ret) {
        }
    },
    toObject: {
        transform: function (doc, ret) {
        }
    },
    createRestApi: true,
    strict: true
});
mongoose.model('menu', pages);
const glob = require('glob');

const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    if (req.query.populate || req.query.select || req.query.query){
        let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
        console.log(est);
        mongoose.model('establishment')
            .findOne({subdomain: est})
            .select('_id')
            .exec((err, doc)=>{
                if (err) return res.serverError(err);
                if (!doc) return res.notFound('Somesing broken');
                if (doc) {
                    let estId = new mongoose.mongo.ObjectId(doc._id);
                    req.query.query = JSON.stringify({ownerest: estId});
                    return next();
                }
            });

    }else{
        mongoose.model('menu')
            .find({ownerest: req.params['id']})
            .populate({path:'dishes', select:'name _id',
                populate:{path:'dishcategory', select:'name _id'}})
            .exec((err,info)=>{
                if (err) return res.serverError(err);
                if (!info) return res.notFound('Not found');
                if (info) return res.ok(info);
            })
    }


};
const preUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    delete req.body['owneruser'];
    delete req.body['ownerest'];
    next()
};
const postUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    delete req.body['owneruser'];
    delete req.body['ownerest'];

    mongoose.model('menu')
        .findOne({_id: req.params['id']})
        .populate({path:'dishes', select:'name _id',
            populate:{path:'dishcategory', select:'name _id'}})
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.notFound('Not found');
            if (info) return res.ok(info);
        })
};
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    req.body['owneruser'] = req.userId;
    req.body['ownerest'] = req.body.estId;
    next();
};

glob.restify.serve(
    glob.route,
    mongoose.model('menu'),{
        preRead: [glob.jsonParser, glob.cookieParser, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, preUpdate],
        postUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, postUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, preCreate]
    });

