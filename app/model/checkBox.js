const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
    name: {type: String, unique: true, required: [true, "name must be created"]},
    filter: String,
    status: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    owneruser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
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

mongoose.model('checkBox', model);

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
    next()
};
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    req.body['owneruser'] = req.userId;
    next();

};

glob.restify.serve(
    glob.route,
    mongoose.model('checkBox'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.isAdmin, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.isAdmin, preCreate]
    });