const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LiqPay = require('liqpay-sdk');
const publikKey = 'i94942794371';
const privateKey = 'q7b6Yc2wMz0nUVwK30NK1Iaqt9I3nQ23I7LLZPGO';
const liqpay = new LiqPay(publikKey, privateKey);
const data = require('../config/index');
const model = new Schema({
    addressData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
    },
    estAddressData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "oneest"
    },
    menuData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu"
    },
    productData: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    orderCommentData: [{
        text: String,
        data: {type: Date, default: new Date()},
        entity: String
    }],
    orderNumber: Number,
    mail: String,
    adminMail: String,
    status: {type: Number, default: 0},
    totalPrice: Number,
    boxesPrice: Number,
    deliveryPrice: Number,
    currency: String,
    html: String,
    deliveryTime: Date,
    paymentType: String,
    paymentDetail: {
        fiatVal: Number
    },
    orderType: String,
    anyMobile:String,
    data: {type: Date, default: new Date()},
    dataUpdate: {type: Date, default: new Date()},
    isCall: {type: Boolean, default: false},
    editByAdmin: {},
    ownerest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "establishment"
    },
    owneruser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
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

mongoose.model('basketsList', model);

const glob = require('glob');

const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    if (req.query.query){
        return next();
    }
    let searchType = req.query._id ?  'findOne' : 'find';
    let query = {ownerest: req.params['id']};
    req.query.paymentType ? query['paymentType'] = req.query.paymentType : '';
    req.query.orderType ? query['orderType'] = req.query.orderType : '';
    req.query._id ? query['_id'] = req.query._id : '';
    query['status'] = {$ne:0};
    mongoose.model('basketsList')
        [searchType](query)
        .limit(15)
        .sort({data: -1})
        .skip(parseInt(req.query.skip))
        .populate({path:'owneruser', select:'firstName lastName mobile email photo _id data',
                    populate:{path:'photo'}})
        .populate({path:'addressData'})
        .populate({path:'estAddressData', select:"address"})
        .populate({path:'menuData', select:'-forest -categories -dishes'})
        .populate({path:'productData', select:'orderCommentData status dishData portItemData _id count complementData boxData totalPrice',
                    populate:{path:'dishData portItemData boxData complementData.id'}
        })
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.notFound('Not found');
            if (info) return res.ok(info);
        });
    // next()
};
const preUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    console.log('user-admin',req.isUseByAdmin);
    req.body['dataUpdate'] = new Date();

    if (req.isUseByAdmin){
        if(req.body.status == '5'){
            req.body['editByAdmin'] = {};
            if (req.body.totalPrice) req.body['editByAdmin']['totalPrice'] = req.body.totalPrice;
            if (req.body.boxesPrice) req.body['editByAdmin']['boxesPrice'] = req.body.boxesPrice;
            if (req.body.deliveryPrice) req.body['editByAdmin']['deliveryPrice'] = req.body.deliveryPrice;
        }
        req.params.id = req.query.id;
        return next();
    }
    delete req.body['totalPrice'];
    delete req.body['boxesPrice'];
    delete req.body['deliveryPrice'];
    delete req.body['owneruser'];
    delete req.body['ownerest'];
    if (req.body.customAddress && !req.body.customAddress.isSaved){
        delete req.body.customAddress._id;
        mongoose.model('address')
            .create(req.body.customAddress, (e,r)=>{
                if (e) return res.badRequest(e);
                if (!r) return res.notFound('');
                if (r) {
                    req.body.addressData = r._id;
                    next();
                }
            })
    }else if(req.body.addressData || req.body.estAddressData){
        next()
    }else if(req.body.confirm){
        next()
    }else{
        res.badRequest('error212');
    }
};
const postUpdate = (req,res,next)=>{
    const mail = require('../controlers/email');
    let bData = req.erm.result;
    console.log("req",req.isUseByAdmin);
    mongoose.model('basketsList')
        .findOne({_id:bData._id})
        .populate({path:'menuData'})
        .populate({path:'ownerest', select:'mailOfOrder'})
        .exec((e,basketData)=>{
            if (e) return res.badRequest(e);
            if (!basketData) return res.notFound('');
            if (basketData) {
                let min = parseInt(basketData.menuData.deliveryfree);
                let all = parseInt(basketData.totalPrice);
                let dp = parseInt(basketData.menuData.delivery);
                if (!req.body.deliveryPrice){
                    if(min > all){
                        basketData.deliveryPrice = dp
                    }else{
                        basketData.deliveryPrice = 0
                    }
                }
                const data = require('../config/index');
                let userMail = {
                    mail:req.userMail,
                    orderId:bData.orderNumber,
                    link: data.auth.apiDomain+'basket',
                    orderType: bData.orderType,
                    isUser: true
                };
                let estMail = {
                    mail:basketData.ownerest.mailOfOrder,
                    orderId:bData.orderNumber,
                    orderLink:'https://admin.'+data.auth.domain+'/order/'+bData.ownerest+'/'+bData._id,
                    orderType: bData.orderType,
                    isEst: !req.isUseByAdmin
                };
                mail.sendMail(userMail, bData.status);
                mail.sendMail(estMail, bData.status);
                if (bData.status == '3' || bData.status == '5'){
                    let amount;
                    let boxP = bData['editByAdmin'] ? bData['editByAdmin']['boxesPrice'] || bData.boxesPrice : bData.boxesPrice;
                    let totP = bData['editByAdmin'] ? bData['editByAdmin']['totalPrice'] || bData.totalPrice : bData.totalPrice;
                    let delP = bData['editByAdmin'] ? bData['editByAdmin']['deliveryPrice'] || bData.deliveryPrice : bData.deliveryPrice;
                    if (bData.orderType == 'delivery'){
                        amount = parseInt(boxP) + parseInt(totP) + parseInt(delP);
                    }else if(bData.orderType == 'bySelf'){
                        amount = parseInt(boxP) + parseInt(totP);
                    }else if(bData.orderType == 'reserve'){
                        amount = parseInt(totP);
                    }else{
                        return res.badRequest()
                    }

                    let html = liqpay.cnb_form({
                        'action'         : 'pay',
                        'amount'         : amount,
                        'currency'       : 'UAH',
                        'description'    : 'Оплата замовлення №'+bData.orderNumber,
                        'order_id'       : bData._id+'_'+new Date().getTime(),
                        'version'        : '3',
                        'sandbox'        : '1',
                        'server_url'     : data.auth.apiDomain+'api/liqpayCallback'
                    });
                    basketData['html'] = html;
                }
                mongoose.model('basketsList')
                    .findOneAndUpdate({_id: basketData._id},  basketData)
                    .exec((e,r)=>{
                        if (e) return res.badRequest(e);
                        if (!r) return res.notFound('');
                        if (r) {
                            next();
                        }
                    })
            }
        })
};
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);

    delete req.body['totalPrice'];
    delete req.body['boxesPrice'];
    delete req.body['deliveryPrice'];

    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    mongoose.model('establishment').findOne({subdomain:est})
        .select('_id')
        .exec((err,resId)=>{
            if(err) return res.badRequest(err);
            if(!resId) return res.badRequest('error');
            if(resId) {
                req.body['owneruser'] = req.userId;
                req.body['ownerest'] = resId;
                next();
            }
        });


};
const preDelete = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    if(req.params.id){
        if (req.basketStatus == 0 || req.basketStatus == 5){
            removeProductsOfBasket(req.products, req);
            next()
            // console.log(req.products)
        }else{
            res.ok("Замовлення скасовано!");
        }

    }else{
        res.badRequest("basket id is required")
    }
};
const removeProductsOfBasket = (products, req) =>{
    products.map(id=>{
        mongoose.model('product')
            .findOneAndRemove({_id:id, owneruser: req.userId})
            .exec((e,r)=>{

            })
    })
};
const checkOwner = (req,res,next)=>{
    require("../responces/serverError")(req, res);
    require("../responces/forbidden")(req, res);
    require("../responces/badRequest")(req, res);
    if(!req.params.id){return res.badRequest()}
    console.log(req.params.id, req.userId);
    mongoose.model('basketsList')
        .findOne({_id:req.params.id, owneruser: req.userId})
        .exec((e,r)=>{
            if (e) return res.serverError(e);
            if (!r) return res.forbidden('as');
            if (r){
                req.basketStatus = r.status;
                req.products = r.productData;
                return next()
            }
        })
};

const validator = (req,res,next)=>{
    require("../responces/badRequest")(req, res);
    if (req.isUseByAdmin){
        return next();
    }
    if (req.userId && req.userMail && (req.mobile || req.body.anyMobile)) {
        next()
    }else{
        res.badRequest('Перевірте наявність пошти і мобільного в профілі')
    }
};

glob.restify.serve(
    glob.route,
    mongoose.model('basketsList'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, glob.getId, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.isByAdmin, validator, preUpdate],
        postUpdate: [glob.jsonParser, glob.cookieParser, postUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, preCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, checkOwner, preDelete]
    });