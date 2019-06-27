const mongoose = require('mongoose');
const Est = mongoose.model('establishment');
const Schema = mongoose.Schema;
const model = new Schema({
    dishData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dish"
    },
    portItemData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "portItem"
    },
    menuData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu"
    },
    complementData: [
        {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "complement"
            },
            count: Number
        }],
    categoryData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    boxData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "box"
    },
    orderCommentData: [{
        text: String,
        data: {type: Date, default: new Date()},
        entity: String
    }],
    isCustom: {type: Boolean, default: false},
    status: {type: Boolean, default: true},
    data: {type: Date, default: new Date()},
    count: {type: Number, default: 1},
    totalPrice: Number,
    isEditByAdmin: {type: Boolean, default: false},
    customObj: {},
    ownerest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "establishment"
    },
    owneruser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
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

mongoose.model('product', model);

const glob = require('glob');

const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next()
};
const preUpdate = async (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    if(!req.isUseByAdmin){
        delete req.body['totalPrice'];
        delete req.body['owneruser'];
        delete req.body['ownerest'];
    }

    let Price = await calcPrice({_id:req.params.id}).catch(e=>{return res.badRequest(e)});
    mongoose.model('product')
        .findOne({_id:req.params.id, owneruser: req.userId})
        .exec( async (e,r)=>{
            if (e) return res.badRequest(e);
            if (!r) return res.notFound();
            if (r) {
                let result = await updateProdBasket({_id:req.body.BasketId},r,Price,-1).catch(e=>{return res.badRequest(e)});
                if(result) {
                    next();
                }
            }
        })
    // next()
};
const postUpdate = async (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    let product = req.erm.result;
    let Price = await calcPrice(product).catch(e=>{return res.badRequest(e)});
    //console.log(Price);
    let basket = {
        menuData: product.menuData,
        productData: [product._id],
        status: 0,
        totalPrice: Price.totalPrice,
        boxesPrice: Price.boxesPrice,
        deliveryPrice: Price.deliveryPrice,
        ownerest: product.ownerest,
        owneruser: product.owneruser,
    };
    mongoose.model("product")
        .findOneAndUpdate({_id:product._id},{totalPrice:Price.totalPriceProduct})
        .exec((e,r)=>{});
    mongoose.model('basketsList')
        .findOne({owneruser:req.userId,ownerest:product.ownerest,menuData:product.menuData,status:0})
        .select("_id")
        .exec(async (e,r)=>{
            if (e) return res.badRequest(e);
            if (!r) {
                return res.badRequest('');
            }
            if (r){
                let result = await updateProdBasket({_id:req.body.BasketId},product,Price,1).catch(e=>{return res.badRequest(e)});
                if(result){
                    mongoose.model('product')
                        .findOne({_id:req.params.id, owneruser: req.userId})
                        .populate({path:'complementData.id'})
                        .exec( async (e,r)=>{
                            if (e) return res.badRequest(e);
                            if (!r) return res.notFound();
                            if (r) {
                                res.ok(r);
                            }
                        })
                }
            }
        });
};
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    delete req.body['totalPrice'];
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    if(req.body.orderCommentData){
        if(req.body.orderCommentData.text){
            req.body.orderCommentData.entity = 'user';
        }else{
            delete req.body.orderCommentData;
        }
    }else{
        delete req.body.orderCommentData;
    }


    Est.findOne({subdomain:est})
        .select('_id')
        .exec((err,resId)=>{
            if(err) return res.badRequest(err);
            if(!resId) return res.badRequest('error');
            if(resId) {
                req.body['owneruser'] = req.userId;
                req.body['ownerest'] = resId._id;
                next();
            }
        });
};
const postCreate = async (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    let product = req.erm.result;
    let Price = await calcPrice(product).catch(e=>{return res.badRequest(e)});
    let basket = {
        menuData: product.menuData,
        productData: [product._id],
        status: 0,
        totalPrice: Price.totalPrice,
        boxesPrice: Price.boxesPrice,
        ownerest: product.ownerest,
        owneruser: product.owneruser,
    };
    mongoose.model("product")
        .findOneAndUpdate({_id:product._id},{totalPrice:Price.totalPriceProduct})
        .exec((e,r)=>{});
    mongoose.model('basketsList')
        .findOne({owneruser:req.userId,ownerest:product.ownerest,menuData:product.menuData,status:0})
        .select("_id")
        .exec(async (e,r)=>{
            if (e) return res.badRequest(e);
            if (!r) {
                mongoose.model('basketsList').find().sort({orderNumber: -1}).limit(1)                    
                    .exec((e,res)=>{
                        basket['orderNumber'] = res[0].orderNumber ? parseInt(res[0].orderNumber)+1 : 1;
                        mongoose.model('basketsList')
                            .create(basket, (e,c)=>{
                                if (e) return res.badRequest(e,basket);
                                next()
                            })
                    });
                //цей спосіб не підходить
                //mongoose.model('basketsList')
                //    .count({})
                //    .exec((e,count)=>{
                //        basket['orderNumber'] = count ? parseInt(count)+1 : 1;
                //        mongoose.model('basketsList')
                //            .create(basket, (e,c)=>{
                //                if (e) return res.badRequest(e,basket);
                //                next()
                //            })
                //    });

            }
            //console.log(r);
            if (r){
                let result = await updateBasket({_id:r._id},product,Price,1).catch(e=>{return res.badRequest(e)});
                if(result) next();
            }
        });
};
const updateBasket = (basket,product,Price,i)=>{
    let q;
    if (i == 1) {
        q = {
            $push:{productData: product._id},
            $inc:{totalPrice:Price.totalPrice*i, boxesPrice:Price.boxesPrice*i}
        }
    }
    if (i == -1){
        q = {
            $pull:{productData: product._id},
            $inc:{totalPrice:(Price.totalPrice*i), boxesPrice:(Price.boxesPrice*i)}
        }
    }
  return new Promise ((resolve,reject)=>{
      //console.log(basket);
      mongoose.model('basketsList')
          .findOneAndUpdate(basket,q,{new:true}).exec((e,r)=>{
          if(e) return reject(e);
          if(!r) return reject("error0");
          if(r) {
              if (r.productData && (i == -1)){
                  if(r.productData.length == 0){
                      mongoose.model('basketsList')
                          .findOneAndRemove(r._id).exec((e,rd)=> {
                          if (e) return reject(e);
                          if (!rd) return reject("error12");
                          return resolve(r)
                      })
                  }else {return resolve(r)}
              }else {return resolve(r)}

          }
      })
  })
};
const updateProdBasket = (basket,product,Price,i)=>{
    let q;
    if (i == 1) {
        if (product.status) {
            q = {
                $inc: {totalPrice: Price.totalPrice * i, boxesPrice: Price.boxesPrice * i}
            }
        }else{
            q = {
                $inc: {totalPrice: 0, boxesPrice: 0}
            }
        }
    }
    if (i == -1){
        if (product.status) {
            q = {
                $inc: {totalPrice: Price.totalPrice * i, boxesPrice: Price.boxesPrice * i}
            }
        }else{
            q = {
                $inc: {totalPrice: 0, boxesPrice: 0}
            }
        }
    }
  return new Promise ((resolve,reject)=>{
      //console.log(basket);
      mongoose.model('basketsList')
          .findOneAndUpdate(basket,q,{new:true}).exec((e,r)=>{
          if(e) return reject(e);
          if(!r) return reject("error0");
          if(r) {
              if (r.productData && (i == -1)){
                  if(r.productData.length == 0){
                      mongoose.model('basketsList')
                          .findOneAndRemove(r._id).exec((e,rd)=> {
                          if (e) return reject(e);
                          if (!rd) return reject("error12");
                          return resolve(r)
                      })
                  }else {return resolve(r)}
              }else {return resolve(r)}

          }
      })
  })
};
const preDelete = async (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    if(req.params.id){
        let Price = await calcPrice({_id:req.params.id}).catch(e=>{return res.badRequest(e)});
        mongoose.model('product')
            .findOneAndRemove({_id:req.params.id, owneruser: req.userId})
            .exec( async (e,r)=>{
                if (e) return res.badRequest(e);
                if (!r) return res.notFound();
                if (r) {
                    let result = await updateBasket({owneruser:req.userId,ownerest:r.ownerest,menuData:r.menuData,status:0},r,Price,-1).catch(e=>{return res.badRequest(e)});
                    if(result) res.ok(result);
                }
            })
    }else{
        return res.badRequest("basket id is required")
    }

};

const calcPrice = product => {
  return new Promise((rs,rj)=>{
      mongoose.model('product')
          .findOne({_id:product._id})
          .populate({path:"complementData.id"})
          .populate({path:"portItemData"})
          .populate({path:"boxData"})
          .populate({path:"menuData"})
          .select("portItemData boxData complementData count menuData")
          .exec((e,r)=>{
              if(e) return rj(e);
              if(!r) return rj("not found");
              if(r) {
                  let complementPrice = 0;
                  let portItemPrice = 0;
                  let boxPrice = 0;

                      r.complementData.map(complement=>{
                          if (complement.id){
                          if (complement.id.price){
                              let price = parseInt(complement.id.price.match(/[\d]+/gi)[0]);
                              if(typeof price == "number" && complement.count){
                                  complementPrice += price * complement.count * r.count;
                              }
                          }
                          }
                      });
                      if (r.portItemData){
                          let price = parseInt(r.portItemData.price.match(/[\d]+/gi)[0]);
                          if(typeof price == "number" && r.count){
                              portItemPrice += price * r.count
                          }else {rj("error1")}
                      }else {rj("error2")}
                      if (r.boxData){
                          let price = parseInt(r.boxData.price.match(/[\d]+/gi)[0]);
                          if(typeof price == "number"){
                              boxPrice += price * r.count
                          }else {rj("error3")}
                      }


                  rs({
                      totalPriceProduct: complementPrice + portItemPrice,
                      totalPrice: complementPrice + portItemPrice,
                      boxesPrice: boxPrice,
                      deliveryPrice: parseInt(r.menuData.delivery)
                  })
              }
          })
  })
};

glob.restify.serve(
    glob.route,
    mongoose.model('product'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, glob.getId, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.isByAdmin, preUpdate],
        postUpdate: [glob.jsonParser, glob.cookieParser, postUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, preCreate],
        postCreate: [glob.jsonParser, glob.cookieParser, postCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, preDelete]
    });