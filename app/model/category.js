const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mcat = new Schema({
    name: String,
    label: String,
});
const model = new Schema({
    name: String,
    maincategory: mcat,
    globcategory: String,
    boxcategory: Array,
    owneruser: String,
    ownerest: String,
    data: {type: Date, default: new Date()},
    complementbox: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "complement"
    }],
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "dish"
    }],
},{
    toJSON: {
        transform: function (doc, ret) {},
    },
    toObject: {
        transform: function (doc, ret) {},
        virtuals: false
    },
    createRestApi: true,
    strict: true
});

mongoose.model('category', model);

const glob = require('glob');

const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    mongoose.model('category')
        .find({ownerest: req.params['id']})
        .populate({path:'pic', select:'preload _id'})
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.notFound('Not found');
            if (info) return res.ok(info);
        })
};
const preUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    delete req.body['owneruser'];
    delete req.body['ownerest'];
    next()
};
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    req.body['owneruser'] = req.userId;
    req.body['ownerest'] = req.body.estId;
    next();

};
const preDelete = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next();

};

glob.restify.serve(
    glob.route,
    mongoose.model('category'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, glob.getId, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, preCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, preDelete]
    });