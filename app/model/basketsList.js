const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LiqPay = require('liqpay-sdk');
const publikKey = 'i94942794371';
const privateKey = 'q7b6Yc2wMz0nUVwK30NK1Iaqt9I3nQ23I7LLZPGO';

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
    clients: Number,
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
    req.query.ownerest ? query['_id'] = req.query.ownerest : '';
    req.query.status ? query['status'] = req.query.status : query['status'] = {$ne:0};
    if (req.query.count) {
        console.log(req.query.count);
        mongoose.model('basketsList')
            .count(JSON.parse(req.query.count))
            .exec((err,info)=>{
                if (err) return res.serverError(err);
                if (!info) return res.notFound('Not found');
                if (info) return res.ok({count:info});
            });
    }else{
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
    }
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
    delete req.body['foodcoin'];
    delete req.body['foodCoin'];
    if (req.body.customAddress && !req.body.customAddress.isSaved){
        delete req.body.customAddress._id;
        req.body.customAddress['owneruser'] = req.userId;
        mongoose.model('address')
            .create(req.body.customAddress, (e,r)=>{
                if (e) return res.badRequest(e);
                if (!r) return res.notFound('');
                if (r) {
                    req.body.addressData = r._id;
                    req.params.id = req.query.id;
                    next();
                }
            })
    }else if(req.body.addressData || req.body.estAddressData){
        req.params.id = req.query.id;
        next()
    }else if(req.body.confirm){
        req.params.id = req.query.id;
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
        .populate({path:'ownerest', select:'mailOfOrder publicKey privatKey'})
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
                console.log("test"+basketData.ownerest);

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
                    if (bData.paymentType == 'cart'){
                        if (basketData.publicKey && basketData.privatKey){
                            let liqpay = new LiqPay(basketData.publicKey, basketData.privatKey);
                            let html = liqpay.cnb_form({
                                'action'         : 'pay',
                                'amount'         : amount,
                                'currency'       : 'UAH',
                                'description'    : 'Оплата замовлення №'+bData.orderNumber,
                                'order_id'       : bData._id,
                                'version'        : '3',
                                'sandbox'        : '1',
                                'server_url'     : data.auth.apiDomain+'api/liqpayCallback'
                            });
                            basketData['html'] = html;
                        } else {
                            return res.badRequest();
                        }
                    }
                }
                mongoose.model('basketsList')
                    .findOneAndUpdate({_id: basketData._id},  basketData)
                    .exec((e,r)=>{
                        if (e) return res.badRequest(e);
                        if (!r) return res.badRequest('');
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
            mongoose.model('basketsList')
                .findOneAndUpdate({_id:req.params.id},{status:'7'})
                .exec((e,r)=>{
                    res.ok({info:"Замовлення скасовано!"});
                });
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
const validateFoodcoin = (req,res,next)=>{

    mongoose.model('basketsList')
        .findOne({_id:req.params.id || req.query.id})
        .exec((e0,r0)=>{
            if (r0){
                mongoose.model('establishment')
                    .findOne({_id:r0.ownerest})
                    .exec((e,r)=>{
                        let price = 0;
                        let boxP = r0['editByAdmin'] ? r0['editByAdmin']['boxesPrice'] || r0.boxesPrice : r0.boxesPrice || 0;
                        let totP = r0['editByAdmin'] ? r0['editByAdmin']['totalPrice'] || r0.totalPrice : r0.totalPrice;
                        let delP = r0['editByAdmin'] ? r0['editByAdmin']['deliveryPrice'] || r0.deliveryPrice : r0.deliveryPrice || 0;
                        if (req.body.orderType == 'delivery' || r0.orderType == 'delivery') price = parseInt(totP) +parseInt(delP)+parseInt(boxP);
                        if (req.body.orderType == 'bySelf' || r0.orderType == 'bySelf') price = parseInt(totP)+parseInt(boxP);
                        if (req.body.orderType == 'reserve' || r0.orderType == 'reserve') price = parseInt(totP);
                        console.log(price, r0, r0 == 'reserve')
                        if (r && price>0) {
                            if (r.foodCoin >= price*0.05){
                                return next();
                            }
                        }
                        if (req.body.status == '1')
                            return res.badRequest({mess:"Заклад зараз не може прийняти замовлення. Спробуйте пізніше!1"});
                        if (req.body.status == '6' || req.body.status == '5')
                            return res.badRequest({mess:"Не достатньо коштів на балансі!"});
                    })
            }else{
                console.log(e0, req.params._id)
                return res.badRequest(e0?e0:{})
            }

        })

};
const validateUserFoodcoin = (req,res,next)=>{
    mongoose.model('basketsList')
        .findOne({_id:req.params.id || req.query.id})
        .exec((e0,r0)=>{
            if (r0){

                mongoose.model('user')
                    .findOne({_id:req.userId})
                    .exec((e,r)=>{
                        let price = 0;
                        let boxP = r0['editByAdmin'] ? r0['editByAdmin']['boxesPrice'] || r0.boxesPrice : r0.boxesPrice;
                        let totP = r0['editByAdmin'] ? r0['editByAdmin']['totalPrice'] || r0.totalPrice : r0.totalPrice;
                        let delP = r0['editByAdmin'] ? r0['editByAdmin']['deliveryPrice'] || r0.deliveryPrice : r0.deliveryPrice;
                        if (req.body.orderType == 'delivery' || r0.orderType == 'delivery') price = totP+delP+boxP;
                        if (req.body.orderType == 'bySelf' || r0.orderType == 'bySelf') price = totP+boxP;
                        if (req.body.orderType == 'reserve' || r0.orderType == 'reserve') price = totP;
                        if (r && price>0 && (r0.paymentType == 'coin')){
                            if (r.foodcoin >= price){
                                console.log(req.body.status);
                                console.log(req.body);
                                if (req.body.status == '6') {
                                    mongoose.model('establishment')
                                        .findOneAndUpdate({_id:r0.ownerest}, {$inc:{foodCoin:-(price*0.05)}})
                                        .exec((e1,r1)=>{
                                            console.log("ER!!!",e1,r1);
                                            if (e1 || !r1) return res.badRequest({mess:"Error"});
                                            if (r0.paymentType != 'coin') price = price*0.05;
                                            if (r0.paymentType == 'coin') price = -price*0.95;
                                            mongoose.model('user')
                                                .findOneAndUpdate({_id:req.userId},
                                                    {$inc:{foodcoin:price}})
                                                .exec((e2,r2)=>{
                                                    console.log("ER2222",e2,r2);
                                                    if(e2 || !r2) return res.badRequest({mess:"Error"});
                                                    return next()
                                                })
                                        })
                                } else { return next() }
                            }
                        }else if (r0.paymentType != 'coin'){
                            return next()
                        }
                        return res.badRequest({mess:"Заклад зараз не може прийняти замовлення. Спробуйте пізніше!"})
                    })
            }else{
                return res.badRequest(e0?e0:{})
            }
        })
};

glob.restify.serve(
    glob.route,
    mongoose.model('basketsList'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, glob.getId, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.isByAdmin, validator,
            validateFoodcoin, validateUserFoodcoin, preUpdate],
        postUpdate: [glob.jsonParser, glob.cookieParser, postUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, preCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, checkOwner, preDelete]
    });