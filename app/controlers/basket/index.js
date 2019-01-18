const mongoose = require('mongoose');
const Category = mongoose.model('category');
const Complement = mongoose.model('complement');
const Establishment = mongoose.model('establishment');
const Product = mongoose.model('product');
const Basket = mongoose.model('basket');

const update = (req,res,estId,doc)=>{
    let obj = req.body;
    obj['ownerest'] = estId;
    obj['owneruser'] = req.userId;

    Product.create(obj, (err, prdct)=>{
        if (err) return res.badRequest(err);
        if (!prdct) return res.serverError('Somesing broken');
        if (prdct) {
            Basket
                .findOneAndUpdate({_id:doc._id},
                    {$push:{products:prdct._id}},
                    {new:true})
                .exec((err,resBasket)=>{
                    if (err) return res.badRequest(err);
                    if (!resBasket) return res.serverError('Somesing broken');
                    if (resBasket) return res.ok(resBasket);
                })
        }
    })
};
const create = (req,res,estId)=>{

    let obj = req.body;
    obj['ownerest'] = estId._id;
    obj['owneruser'] = req.userId;

    let newBasket = {
        name: estId.name,
        av: estId.av,
        ownerest: estId._id,
        owneruser: req.userId
    };
    Basket.create(newBasket, (err, bskt)=>{
        if (err) return res.badRequest(err);
        if (!bskt) return res.serverError('Somesing broken');
        if (bskt) {
            Product.create(obj, (err, prdct)=>{
                if (err) return res.badRequest(err);
                if (!prdct) return res.serverError('Somesing broken');
                if (prdct) {
                    Basket
                        .findOneAndUpdate({_id:bskt._id},
                            {$push:{products:prdct._id}},
                            {new:true})
                        .exec((err,resBasket)=>{
                            if (err) return res.badRequest(err);
                            if (!resBasket) return res.serverError('Somesing broken');
                            if (resBasket) return res.ok(resBasket);
                        })
                }
            })
        }
    });
};

module.exports.addProduct = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    Establishment
        .findOne({subdomain: est})
        .select('_id name av')
        .exec((err, estId)=>{
            if (err) return res.badRequest(err);
            if (!estId) return res.serverError('Somesing broken');
            if (estId) {
                Basket.findOne({ownerest:estId._id,owneruser:req.userId})
                    .select('_id')
                    .exec((err,doc)=>{
                        if (err) return res.badRequest(err);
                        if (!doc) {
                            create(req,res,estId)
                        }
                        if (doc){
                            update(req,res,estId._id,doc)
                        }
                    })
            }
        });
};
module.exports.getBasketEst = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    Establishment
        .findOne({subdomain: est})
        .select('_id')
        .exec((err, estId)=>{
            if (err) return res.badRequest(err);
            if (!estId) return res.serverError('Somesing broken');
            if (estId) {
                Basket.findOne({ownerest:estId._id,owneruser:req.userId})
                    .populate({path: 'products',
                        populate:{path:'portionCheck'}})
                    .populate({path: 'products',
                        populate:{path:'dishId',
                            populate:{path:'dishcategory',
                                populate:{path:'complementbox'}}},
                        })
                    .exec((err,doc)=>{
                        if (err) return res.badRequest(err);
                        if (!doc) {
                            return res.serverError('Somesing broken');
                        }
                        if (doc){
                            return res.ok(doc);
                        }
                    })
            }
        });
};
module.exports.getBasket = (req, res, next) => {

    Basket.find({owneruser:req.userId})
        .populate({path: 'products', populate:{path:'info', populate:{path:'dishcategory pic', populate:{path:'complementbox'}}}})
        .populate({path: 'products',
            populate:{path:'portionCheck'}})
        .populate({path: 'products',
            populate:{path:'dishId',
                populate:{path:'pic'}},
        })
        .populate({path: 'products',
            populate:{path:'dishId',
                populate:{path:'dishcategory',
                    populate:{path:'complementbox'}}},
        })
        .exec((err,doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) {
                return res.serverError('Somesing broken');
            }
            if (doc){
                return res.ok(doc);
            }
        })
};
module.exports.checkbox = (req, res, next) => {

    Complement.find({'maincategory.id':req.params.id})
        .exec((err,doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) {
                return res.serverError('Somesing broken');
            }
            if (doc){
                return res.ok(doc);
            }
        })
};