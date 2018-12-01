const mongoose = require('mongoose');
const User = mongoose.model('user');
const Establishment = mongoose.model('establishment');

module.exports.create = (req, res, next) => {
    req.body['owner'] = req.userId;
    req.body['data'] = new Date();
    req.body['name'] = req.body['subdomain'];
    Establishment.create(req.body, (err, doc)=>{
        if (err) return res.badRequest(err);
        if (!doc) return res.serverError('Somesing broken');
        if (doc){
            User
                .findOneAndUpdate({_id:req.userId}, {$push:{myEstablishment:doc._id}}, {new: true})
                .exec((err, result)=>{
                    if (err) return res.badRequest(err);
                    if (!result) return res.serverError('Somesing broken');
                    if (result){
                        return res.ok(doc);
                    }
                });
        }
    });
};

module.exports.customParams = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[0];
    let select = req.query.select;//`${req.params['id']} _id`;
    let populate = JSON.parse(req.query.populate);
    Establishment
        .findOne({subdomain: est})
        .select(select).populate(populate)
        .exec((err, doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) return res.serverError('Somesing broken');
            if (doc) return res.ok(doc);
        })
};
module.exports.custom = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[0];
    let select = req.query.select;//`${req.params['id']} _id`;
    let populate = JSON.parse(req.query.populate);
    Establishment
        .findOne({subdomain: est})
        .select(select).populate(populate)
        .exec((err, doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) return res.serverError('Somesing broken');
            if (doc) return res.ok(doc);
        })
};

module.exports.estPost = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[0];

    mongoose.model('post').schema.eachPath(function(path) {
        console.log(path);
    });
    mongoose.model('post')
        .find({"inPlace.place": est})
        .exec((err, doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) return res.serverError('Somesing broken');
            if (doc) return res.ok(doc);
        })
};
module.exports.estMenu = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[0];

    Establishment
        .findOne({subdomain: est})
        .populate({path:'myest',
            populate:{path:'menus', select:'_id name categories',
            populate:{path: 'categories',
            populate:{path: 'dishes'}}}})
        .select('myest')
        .exec((err, doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) return res.serverError('Somesing broken');
            if (doc) return res.ok(doc);
        })
};
module.exports.estEst = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[0];

    Establishment
        .findOne({subdomain: est})
        .populate({path:'myest', select:'-own'})
        .select('myest')
        .exec((err, doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) return res.serverError('Somesing broken');
            if (doc) return res.ok(doc);
        })
};
