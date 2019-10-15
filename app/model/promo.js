const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const maincategoryschema = new Schema({
    id: String,
    name: String,
    label: String
});
const model = new Schema({
    name: String,
    maincategory: [maincategoryschema],
    grafic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "timeWork"
    },
    discount: String,
    owneruser: String,
    ownerest: String,
    delivery: {type: Boolean, default: false},
    getself: {type: Boolean, default: false},
    reservation: {type: Boolean, default: false},
    data: {type: Date, default: Date.now},
    active: {type: Boolean, default: true},
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

mongoose.model('promo', model);

const glob = require('glob');

const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    mongoose.model('promo')
        .find({ownerest: req.params['id']})
        .sort({'data':-1})
        .populate({path:'grafic'})
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
const postCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);    
    return next();
};
const preDelete = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next();
};
const werify = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    mongoose.model('promo')
        .findOne({_id: req.params.id})
        .select('ownerest')
        .exec((err, result) => {
            if (err) return res.badRequest(err);
            if (!result) return res.notFound("");
            if (result) {
                mongoose.model('user')
                    .findOne({_id:req.userId, myEstablishment:{$in:result.ownerest}})
                    .exec((err,doc)=>{
                        if (err) return res.badRequest(err);
                        if (!doc) return res.notFound();
                        if (doc) {
                            delete req.body['ownerEst'];
                            next()
                        }
                    });
            }
        });
};

glob.restify.serve(
    glob.route,
    mongoose.model('promo'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, glob.getId, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getOwner, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getOwner, preCreate],
        postCreate: [glob.jsonParser, glob.cookieParser, postCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, werify, preDelete]
    });