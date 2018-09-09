const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pages = new Schema({
    title: String,
    des: String,
    userId: String,
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
    console.log("ok",req.userId);
    req.body.userId = req.userId;
    next()
};

glob.restify.serve(
    glob.route,
    mongoose.model('post'),
    {
        preMiddleware: [glob.isAuth, preSave]
    });