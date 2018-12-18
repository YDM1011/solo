const mongoose = require('mongoose');
const Est = mongoose.model('establishment');
const Schema = mongoose.Schema;
const portionschema = new Schema({
    massa: String,
    name: String,
    about: String,
    price: String,

});
const model = new Schema({
    info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dish"
    },
    portionCheck: [{
        count: {type: Number, default: 1},
        type: mongoose.Schema.Types.ObjectId,
        ref: "portItem"
    }],
    data: {type: Date, default: new Date()},
    ownerest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "establishment"
    },
    owneruser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
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

mongoose.model('product', model);

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
    delete req.body['owneruser'];
    delete req.body['ownerest'];
    next()
};
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    Est.findOne({subdomain:est})
        .select('_id')
        .exec((err,resId)=>{
            if(err) return res.badRequest(err);
            if(!resId) return res.badRequest('error');
            if(resId) {
                req.body['owneruser'] = req.userId;
                req.body['ownerest'] = resId;
                next();
            }
        });
};
const preDelete = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next();
};

glob.restify.serve(
    glob.route,
    mongoose.model('product'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, glob.getId, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, preCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, preDelete]
    });