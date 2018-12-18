const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = new Schema({
    massa: String,
    name: String,
    about: String,
    price: String,
    dishId: String,
    menuId: String,
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

mongoose.model('portItem', model);

const glob = require('glob');

const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next();

};
const preUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next()
};
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next()
};
const postCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    console.log(req.erm.result);
    mongoose.model('dish')
        .findOneAndUpdate({_id: req.body.dishId}, {$push:{portion:req.erm.result._id}}, {new: true})
        .exec((err,info)=>{
            if(err) return res.badRequest("error");
            if(info) return next();
        });


};

glob.restify.serve(
    glob.route,
    mongoose.model('portItem'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, preCreate],
        postCreate: [glob.jsonParser, glob.cookieParser, glob.getId, postCreate],
    });