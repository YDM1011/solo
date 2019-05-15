const mongoose = require('mongoose');
const Category = mongoose.model('category');
const Complement = mongoose.model('complement');
const Establishment = mongoose.model('establishment');
const Product = mongoose.model('product');
const Basket = mongoose.model('basket');
const BasketList = mongoose.model('basketsList');
const LiqPay = require('liqpay-sdk');
const publikKey = 'i94942794371';
const privateKey = 'q7b6Yc2wMz0nUVwK30NK1Iaqt9I3nQ23I7LLZPGO';
const liqpay = new LiqPay(publikKey, privateKey);

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
    console.log(est);
    Establishment
        .findOne({subdomain: est})
        .select('_id')
        .exec((err, estId)=>{
            console.log(err,estId);
            if (err) return res.serverError(err);
            if (!estId) return res.notFound('Somesing broken');
            if (estId) {
                if (req.params.id){
                    BasketList.findOne({ownerest:estId._id,owneruser:req.userId,_id:req.params.id})
                        .populate({path: 'productData',
                            populate:{path:'categoryData',
                                populate:{path:"complementbox"}}})
                        .populate({path: 'menuData',
                            populate:{path:'dishData'}
                        })
                        .populate({path: 'productData',
                            populate:{path:'portItemData boxData complementData.id dishData'}
                        })
                        .populate({path: 'ownerest',select:"av name subdomain minPrice delivery getself reservation",
                            populate:{path:'av'}
                        })
                        .sort({dataUpdate: -1})
                        .exec((err,doc)=>{
                            console.log("ok",doc)
                            if (err) return res.serverError(err);
                            if (!doc) {
                                return res.ok([]);
                            }
                            if (doc){
                                return res.ok(doc);
                            }
                        })

                } else{
                    let query = {ownerest:estId._id,owneruser:req.userId};
                    if(req.query.status == 'history'){
                        query['$or'] = [{status:6},{status:7}]
                    } else {
                        query['$and'] = [{status:{$ne:6}},{status:{$ne:7}}]
                    }
                    BasketList.find(query)
                        .populate({path: 'productData',
                            populate:{path:'categoryData',
                                populate:{path:"complementbox"}}})
                        .populate({path: 'menuData',
                            populate:{path:'dishData'}
                        })
                        .populate({path: 'productData',
                            populate:{path:'portItemData boxData complementData.id dishData'}
                        })
                        .populate({path: 'ownerest',select:"av name subdomain delivery getself reservation",
                            populate:{path:'av'}
                        })
                        .sort({dataUpdate: -1})
                        .exec((err,doc)=>{
                            if (err) return res.serverError(err);
                            if (!doc) {
                                return res.ok([]);
                            }
                            if (doc){
                                return res.ok(doc);
                            }
                        })
                }

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

module.exports.test = (req,res,next)=>{
    var html = liqpay.cnb_form({
        'action'         : 'pay',
        'amount'         : '1',
        'currency'       : 'UAH',
        'description'    : 'Оплата замовлення',
        'order_id'       : 'order_id_18',
        'version'        : '3',
        'server_url'     : 'https://faf9f66e.ngrok.io/api/liqpayCallback'
    });
    res.ok({html:html});
};
module.exports.liqpayCallback = (req,res,next)=>{
    let sign = liqpay.str_to_sign(privateKey + req.body.data + privateKey);
    let data = new Buffer(req.body.data, 'base64').toString();
    const conf = require('../../config/index');
    const mail = require('../email');
    console.log("test1",sign);
    console.log("test2",data);
    if(req.body.signature == sign){
        let Order = JSON.parse(data);
        if (Order.status == "sandox" || Order.status == "success")
        mongoose.model('basketsList')
            .findOneAndUpdate({_id:Order['order_id']},{status:'6'})
            .populate({path:'menuData'})
            .populate({path:'ownerest', select:'mailOfOrder'})
            .exec((e,r)=>{
                if (r){
                    let estMail = {
                        mail:r.ownerest.mailOfOrder,
                        orderId:r.orderNumber,
                        orderLink:'https://admin.'+conf.auth.domain+'/order/'+r.ownerest._id+'/'+r._id,
                        orderType: r.orderType,
                        isEst: true
                    };
                    mail.sendMail(estMail, 6);
                    res.ok()
                }
            })
    }
};