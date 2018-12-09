const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const portionschema = new Schema({
    massa: String,
    name: String,
    about: String,
    price: String
});
const ingredientisschema = new Schema({
    name: String,
    check: {type: Boolean, default: false}
});
const dishingredientname = new Schema({
    name: String,
});
const model = new Schema({
    name: String,
    dishcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    about: String,
    portion: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "portItem"
    }],
    dishingredient: Array,
    ingredientis: [ingredientisschema],
    pic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "avatar"
    },
    dishlike: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    dishcomment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    dishshare: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    countlike: Number,
    countcomment: Number,
    countshare: Number,
    owneruser: String,
    ownerest: String,
    isnew: {type: Boolean, default: true},
    ishit: {type: Boolean, default: true},
    isdelivery: {type: Boolean, default: true},
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

mongoose.model('dish', model);

const glob = require('glob');

const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    if (req.query.select == 'all'){
        mongoose.model('dish')
            .find({ownerest: req.params['id']})
            .populate({path:'dishcategory', select:'name _id'})
            .populate({path:'portion'})
            .select('dishcategory name portion _id')
            .exec((err,info)=>{
                if (err) return res.serverError(err);
                if (!info) return res.notFound('Not found');
                if (info) return res.ok(info);
            })
    }else{
        if (req.query.populate || req.query.select || req.query.query){
            return next();
        }
        mongoose.model('dish')
            .find({ownerest: req.params['id']})
            .populate({path:'pic', select:'preload _id'})
            .populate({path:'dishcategory', select:'name _id'})
            .populate({path:'portion'})
            .exec((err,info)=>{
                if (err) return res.serverError(err);
                if (!info) return res.notFound('Not found');
                if (info) return res.ok(info);
            })
    }

};
const postUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    mongoose.model('dish')
        .find({ownerest: req.erm.result.ownerest})
        .populate({path:'pic', select:'preload _id'})
        .populate({path:'dishcategory', select:'name _id'})
        .populate({path:'portion'})
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.notFound('Not found');
            if (info) return res.ok(info);
        })
};
const createPic = (req,res)=>{
    return new Promise((resolve, reject)=>{
    mongoose.model('avatar')
        .create(req.body['pic'], (err, doc)=>{
            if (err) return res.serverError(err);
            if (!doc) return res.notFound('Not found 1');
            if (doc) {
                resolve(doc['_id']);
            }
        })
    });
};
const updatePic = (req,res, id)=>{
    return new Promise((resolve, reject)=>{
        let obj = {
            preload: req.body['pic'].preload,
            larg: req.body['pic'].larg,
        };
    mongoose.model('avatar')
        .findOneAndUpdate({_id: id}, obj, {new: true})
        .exec((err, doc)=>{
            if (err) return res.serverError(err);
            if (!doc) return res.notFound('Not found 2');
            if (doc) {
                console.log(doc['_id']);
                resolve(doc['_id']);
            }
        })
    });
};
const preUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    delete req.body['owneruser'];
    delete req.body['ownerest'];
    if (!req.body.dishcategory){
        mongoose.model('category')
            .findOneAndUpdate({},
                {$pull:{dishes:req.body._id}}, {new: true})
            .exec((err, content) =>{
                if(err) {
                    return console.log(err);
                } else {
                }
            });
    }else{
        mongoose.model('category')
            .findOne({_id: req.body.dishcategory._id, dishes:{$in: req.body._id}})
            .exec((err,info)=>{
                if (err) return console.log(err);
                if (info) return null;
                if (!info) {
                    mongoose.model('category')
                        .findOneAndUpdate({_id: req.body.dishcategory._id},
                            {$push:{dishes:req.body._id}}, {new: true})
                        .exec((err, content) =>{
                            if(err) {
                                return console.log(err);
                            } else {
                            }
                        });
                };
            });
    }

    mongoose.model('dish')
        .findOne({_id: req.body._id})
        .exec((err,info)=>{
            if (err) return;
            if (!info.pic) {
                createPic(req,res).then((val)=>{
                    if(val){
                        req.body['pic'] = val;
                        // next();
                        mongoose.model('dish')
                            .findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
                            .populate({path:'dishcategory', select:'name _id'})
                            .populate({path:"pic",select:"_id larg"})
                            .populate({path:'portion'})
                            .exec((err,doc)=>{
                                if (err) return res.serverError(err);
                                if (!doc) return res.notFound('Not found');
                                if (doc) return res.ok(doc);
                            })
                    }
                }).catch(err=>{
                    return res.serverError(err);
                });
            }
            if (info.pic) {
                updatePic(req,res,info.pic).then((val)=>{
                    if(val){
                        req.body['pic'] = val;
                        // next();
                        mongoose.model('dish')
                            .findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
                            .populate({path:'dishcategory', select:'name _id'})
                            .populate({path:"pic",select:"_id larg"})
                            .populate({path:'portion'})
                            .exec((err,doc)=>{
                                if (err) return res.serverError(err);
                                if (!doc) return res.notFound('Not found');
                                if (doc) return res.ok(doc);
                            })
                    }
                }).catch(err=>{
                    return res.serverError(err);
                });
            }
        });
        // .findOneAndUpdate({_id: req.body._id}, req.body)
};
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    mongoose.model('avatar')
        .create(req.body['pic'], (err, doc)=>{
            if (err) return res.serverError(err);
            if (!doc) return res.notFound('Not found');
            if (doc) {
                req.body['pic'] = doc['_id'];
                req.body['owneruser'] = req.userId;
                req.body['ownerest'] = req.body.estId;
                next();
            }
        })
};
const postCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);

    // let option = {};
    // option.$push = {pic:req.erm.result._id};
    mongoose.model('category')
        .findOne({_id: req.body.dishcategory, dishes:{$in: req.erm.result._id}})
        .exec((err,info)=>{
            if (err) return console.log(err);
            if (info) return null;
            if (!info) {
                mongoose.model('category')
                    .findOneAndUpdate({_id: req.body.dishcategory},
                        {$push:{dishes:req.erm.result._id}}, {new: true})
                    .exec((err, content) =>{
                        if(err) {
                            return console.log(err);
                        } else {
                        }
                    });
            };
        });
    mongoose.model('dish')
        .findOne({_id: req.erm.result._id})
        .populate({path: 'pic', select: 'larg _id'})
        .populate({path:'portion'})
        .exec((err,info)=>{
            if(err) return res.badRequest(err);
            if(!info) return res.notFound('You are not valid');
            return res.ok(info)
        });
    // next();
};

glob.restify.serve(
    glob.route,
    mongoose.model('dish'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, preUpdate],
        postUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, postUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, preCreate],
        postCreate: [glob.jsonParser, glob.cookieParser, glob.getId, postCreate],
    });