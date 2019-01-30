const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
    name: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    status: String,
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
    strict: true
});

mongoose.model('maincategory', model);

const glob = require('glob');

const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next();
};

const preCreate = (req,res,next)=>{
    req.body['owner'] = req.userId;
    next()
};

const preUpdate = (req,res,next)=>{
    delete req.body['owner'];
    next()
};

glob.restify.serve(
    glob.route,
    mongoose.model('maincategory'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, preRead],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.isAdmin, preCreate],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.isAdmin, preUpdate]
    });