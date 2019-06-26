const mongoose = require('mongoose');
const menuList = mongoose.Schema;

const pages = new menuList({
    name: String,
    delivery: String,
    deliveryfree: String,
    //графік доставки
    deliverytime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "timeWork"
    },
    //графік онлайн-замовлень
    deliveryonline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "timeWork"
    },
    //мінімальний час доставки в хвилинах
    deliverymintime: String,
    //кількість днів, за скільки наперед приймаються замовлення
    maxtime: String,
    steptime: String,
    owneruser: String,
    ownerest: String,
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "dish"
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }],
    forest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "oneest"
    }],
    data: {type: Date, default: new Date()}
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
mongoose.model('menu', pages);
const glob = require('glob');

const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    console.log("");
    if (req.query.populate || req.query.select || req.query.query){
        let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
        mongoose.model('establishment')
            .findOne({subdomain: est})
            .select('_id')
            .exec((err, doc)=>{
                if (err) return res.serverError(err);
                if (!doc) return res.notFound('Somesing broken');
                if (doc) {
                    let estId = new mongoose.mongo.ObjectId(doc._id);
                    req.query.query = {ownerest: estId};
                    // return next();
                    if(req.params['id']){
                        mongoose.model('menu')
                            .findOne({_id: req.params['id']})
                            .populate(JSON.parse(req.query.populate))
                            .populate({path: 'deliverytime deliveryonline'})
                            .select(req.query.select)
                            .exec((err,info)=>{
                                if (err) return res.serverError(err);
                                if (!info) return res.notFound('Not found');
                                if (info) return res.ok(info);
                            })
                    }else{
                        mongoose.model('menu')
                            .find({ownerest: estId})
                            .populate(JSON.parse(req.query.populate))
                            .populate({path: 'deliverytime deliveryonline'})
                            .select(req.query.select)
                            .exec((err,info)=>{
                                if (err) return res.serverError(err);
                                if (!info) return res.notFound('Not found');
                                if (info) {
                                    let result = [];
                                    info.forEach( (item)=>{
                                        if (item.forest){
                                            if (item.forest.length > 0){
                                                result.push(item);
                                            }
                                        }
                                    });
                                    return res.ok(result);
                                }
                            })
                    }

                }
            });

    }else{
        mongoose.model('menu')
            .find({ownerest: req.params['id']})
            .populate({path: 'deliverytime deliveryonline'})
            .populate({path:'dishes', select:'name _id',
                populate:{path:'dishcategory', select:'name _id'}})
            .exec((err,info)=>{
                if (err) return res.serverError(err);
                if (!info) return res.notFound('Not found');
                if (info) return res.ok(info);
            })
    }
};
const preUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    delete req.body['owneruser'];
    delete req.body['ownerest'];
    next()
};
const postUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    delete req.body['owneruser'];
    delete req.body['ownerest'];

    mongoose.model('menu')
        .findOne({_id: req.params['id']})
        //.populate({path: 'deliverytime'})
        .populate({path:'dishes', select:'name _id',
            populate:{path:'dishcategory', select:'name _id'}})
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.notFound('Not found');
            if (info){
                require("../tasks/addCatToOneest").pushPull(req,res,info);
                return res.ok(info);
            }
        })
};
/**
 * 1 шукати заклад в який входить меню
 * 2 перевірити кожне меню чи є там
 * @param id
 * @param info
 */

const preDelete = (req,res,next)=>{
    delete req.body['owneruser'];
    delete req.body['ownerest'];
    next();
};

const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    req.body['owneruser'] = req.userId;
    req.body['ownerest'] = req.body.estId;
    next();
};
const werify = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    mongoose.model('menu')
        .findOne({_id: req.params.id})
        .select('ownerest')
        .exec((err, result) => {
            if (err) return res.badRequest(err);
            if (!result) return res.notFound();
            if (result) {
                mongoose.model('user')
                    .findOne({_id:req.userId, myEstablishment:{$in:result.ownerest}})
                    .exec((err,doc)=>{
                        if (err) return res.badRequest(err);
                        if (!doc) return res.notFound();
                        if (doc) {
                            delete req.body['ownerEst'];
                            next()
                        }
                    });
            }
        });
};
glob.restify.serve(
    glob.route,
    mongoose.model('menu'),{
        preRead: [glob.jsonParser, glob.cookieParser, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getOwner, preUpdate],
        postUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, postUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getOwner, preCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, werify, preDelete]
    });

