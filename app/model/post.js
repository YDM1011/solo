const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pages = new Schema({
    title: {
        type: String,
        required: [true, "Title must be created"]
    },
    des: {
        type: String,
        required: [true, "Description must be created"]
    },
    userId: String,
    img: String,
    data: {type: Date, default: new Date()},
    token: String
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
mongoose.model('post', pages);

const glob = require('glob');
const preSave = (req,res,next)=>{
    req.body.userId = req.userId;
    next()
};
const preRead = (req,res,next)=>{
    req.body.userId = req.userId;
    next()
};
glob.restify.serve(
    glob.route,
    mongoose.model('post'),
    {
        preMiddleware: [glob.isAuth],
        preRead: [glob.jsonParser, glob.isAuth, preRead],
        preCreate: [glob.jsonParser, glob.isAuth, preSave]
    });