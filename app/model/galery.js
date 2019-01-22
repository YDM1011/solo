const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pics = new Schema({
    picCrop: {
        type: String,
    },
    field: {
        type: String,
    },
    model: {
        type: String,
    },
    fileName: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date:{
        type: Date,
        default: new Date()
    }
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
mongoose.model('galery', pics);
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/badRequest")(req, res);
    require("../responces/notFound")(req, res);
    console.log(req.body);
    next()

};
const postCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/badRequest")(req, res);
    require("../responces/notFound")(req, res);
    next()

};
const preUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/badRequest")(req, res);
    require("../responces/notFound")(req, res);
    next()

};
const glob = require('glob');
glob.restify.serve(
    glob.route,
    mongoose.model('galery'),{
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, preCreate],
        postCreate: [glob.jsonParser, glob.cookieParser, glob.getId, postCreate]
    });


// postCreate: [glob.jsonParser, glob.getId, postCreate],