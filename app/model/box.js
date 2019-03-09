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
    price: String,
    owneruser: String,
    ownerest: String,
    data: {type: Date, default: new Date()},
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

mongoose.model('box', model);

const glob = require('glob');

const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    mongoose.model('box')
        .find({ownerest: req.params['id']})
        .sort({'data':-1})
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

glob.restify.serve(
    glob.route,
    mongoose.model('box'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, glob.getId, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, preCreate]
    });