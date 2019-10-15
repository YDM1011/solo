const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
    about: {type: String },
    picC: String,
    picD: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    ownerest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "establishment"
    },
    data: {type: Date, default: Date.now},
},{
    toJSON: {
        transform: function (doc, ret) {},
    },
    toObject: {
        transform: function (doc, ret) {},
        virtuals: false
    },
    createRestApi: true,
    strict: true,
});

mongoose.model('action', model);

const preRead = (req,res,next)=> {
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    mongoose.model('action')
        .find({ownerEst: req.ownerEst})
        .exec((err,doc)=>{
            if(err) return res.badRequest(err);
            if(!doc) return res.notFound();
            if(doc) return res.ok(doc);
    });
    // next()
};

const preUpdate = (req,res,next)=> {
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next()
};

const preCreate = (req,res,next)=> {
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    req.body['owner'] = req.userId;
    next()
};

const preDelete = (req,res,next)=> {
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next()
};

const werify = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    mongoose.model('action')
        .findOne({_id: req.params.id, owner: req.userId})
        .exec((err,result)=>{
            if (err) return res.badRequest(err);
            if (!result) return res.notFound();
            if (result) {
                delete req.body['owner'];
                next()
            }
        })
};

const getEst = (req,res,next) =>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    mongoose.model('establishment')
        .findOne({subdomain: est})
        .exec((err,result)=>{
            if (err) return res.badRequest(err);
            if (!result) return res.notFound();
            if (result) {
                req.ownerEst = result._id;

                next()
            }
        })
};

const glob = require('glob');

glob.restify.serve(
    glob.route,
    mongoose.model('action'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, getEst, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getOwner, werify, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getOwner, preCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, werify, preDelete],
    });