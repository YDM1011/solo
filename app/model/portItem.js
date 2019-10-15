const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = new Schema({
    massa: String,
    name: String,
    about: String,
    price: String,
    dishId: String,
    menuId: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
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
    delete req.body['owner'];
    next()
};
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    req.body['owner'] = req.userId;
    next()
};
const preDelete = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    req.body['owner'] = req.userId;
    mongoose.model('portItem')
        .findOneAndRemove({_id:req.params.id, owner: req.userId})
        .exec((err,result)=>{
            if (err) res.badRequest(err);
            if (!result) res.notFound('not found');
            if (result) res.ok({succses:true});
        })
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
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, preDelete],
        postCreate: [glob.jsonParser, glob.cookieParser, glob.getId, postCreate],
    });