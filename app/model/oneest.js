const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const oneLinks = new Schema({
    url: String,
    label: String
});
const model = new Schema({
    name: {type:String, required:[true, "Enter name"]},
    city: {type:String},
    address: {type:String, required:[true, "Enter address"]},
    coordinates: {type:Array, required:[true, "Enter coordinates"]},
    mobile: {type: String},
    mobiles: [{type: String}],
    worksTime: String,
    worksTimeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "timeWork"
    },
    about: String,
    mail: String,
    status:{type: Boolean, default: true},
    delivery:{type: Boolean, default: true},
    getself:{type: Boolean, default: true},
    reservation:{type: Boolean, default: true},
    data: {type: Date, default: new Date()},
    links: [oneLinks],
    ownerEst:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "establishment"
    },
    menus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu"
    }],
    categoriInUse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "maincategory"
    }],
    labelInUse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "label"
    }]
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

mongoose.model('oneest', model);

const glob = require('glob');

const bg = (req,res,id,model)=>{
    mongoose.model('oneest')
        .findOne({_id:id})
        .populate({path: model,select:'larg _id'})
        .select(model+' -_id')
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.ok('Not found bg');
            if (info) return res.ok(info);
        })
};
const oth = (req,res,id,select)=>{
    mongoose.model('oneest')
        .findOne({_id:id})
        .select(select+' -_id')
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.ok('Not found bg');
            if (info) return res.ok(info);
        })
};
const est = (req,res,id)=>{
    mongoose.model('oneest')
        .findOne({_id:id})
        .populate({path:'menus'})
        .populate({path:"labelInUse"})
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.ok('Not found bg');
            if (info) return res.ok(info);
        })
};
const min = (req,res,id,model)=>{
    mongoose.model('oneest')
        .findOne({_id:id})
        .select(model+' -_id')
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.ok('Not found bg');
            if (info) {
                if(!info.minPrice || info.minPrice < 50) {
                    req.body.minPrice = 50;
                    othu(req, res, id, model)
                }else{
                    return res.ok(info);
                }
            }
        })
};
const othu = (req,res,id,model)=>{
    mongoose.model('oneest')
        .findOneAndUpdate({_id:id},req.body,{new:true})
        .select(model+' -_id')
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.ok('Not found bg');
            if (info) return res.ok(info);
        })
};
const estu = (req,res,id)=>{

    mongoose.model('oneest')
        .findOne({_id:id})
        .exec((e,r)=>{
            if (r){
            mongoose.model('menu')
                .find({ownerest:r.ownerEst})
                .exec((e,r)=>{
                    if (r){
                        let forPullIds = [];
                        r.map(menuId=>{
                            let noId = true;
                            req.body.menus.forEach(item=>{
                                if (item == menuId._id){
                                    noId = false;
                                }
                            });
                            if (noId){
                                forPullIds.push(menuId._id)
                            }
                        });
                        forPullIds.forEach(item=>{
                            mongoose.model('menu')
                                .findOneAndUpdate({_id: item},
                                    {$pull:{forest:id}}, {new: true})
                                .exec((err, content) =>{
                                    if(err) {
                                        // return
                                    } else {
                                        // return
                                    }
                                });
                        });
                    }
                });
            }
        });
    req.body.menus.forEach(item=>{
        mongoose.model('menu')
            .findOne({_id: item, forest:{$in: id}})
            .exec((err, doc)=>{
                if(!doc){
                    mongoose.model('menu')
                        .findOneAndUpdate({_id: item},
                            {$push:{forest:id}}, {new: true})
                        .exec((err, content) =>{
                            if(err) {
                                // return
                            } else {
                                // return
                            }
                        });
                }else{
                    return
                }
            })
    });

    mongoose.model('oneest')
        .findOneAndUpdate({_id:id},req.body,{new:true})
        .populate({path:'menus'})
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.ok('Not found bg');
            if (info) return res.ok(info);
        })
};
const minu = (req,res,id,model)=>{
    if (req.body.minPrice < 50){
        res.badRequest("must be more 50")
    }else{
        othu(req,res,id,model);
    }
};
const subu = (req,res,id,model)=>{
    let errVal = 0;
    let text = '';
    if(req.body.subdomain){
        if(req.body.subdomain.length >= 1
            && req.body.subdomain.length  <= 30){
            let est = req.body.subdomain;
            if((est.toLowerCase() == 'admin') ||
                (est.toLowerCase() == 'api') ||
                (est.toLowerCase() == 'adm') ||
                (est.toLowerCase() == 'travel') ||
                (est.toLowerCase() == 'work') ||
                (est.toLowerCase() == 'reklama') ||
                (est.toLowerCase() == 'run') ||
                (est.toLowerCase() == 'help') ||
                (est.toLowerCase() == 'charity') ||
                (est.toLowerCase() == 'cafe') ||
                (est.toLowerCase() == 'blog') ||
                (est.toLowerCase() == 'shop')
            ){
                errVal++;
                text = `${est} вже зайнятий!`;
                return res.badRequest(text);
            }
        }else{
            errVal++;
            text = 'Домен повинен містити від 1 до 30 символів!';
        }
    }else{
        errVal++;
        text = 'Домен повинен містити від 1 до 30 символів!!';
    }
    
    if (errVal > 0){
        return res.badRequest(text);
    }else{
        mongoose.model('oneest')
            .findOneAndUpdate({_id:id},req.body,{new:true})
            .select(model+' -_id')
            .exec((err,info)=>{
                if (err) return res.serverError(err);
                if (!info) return res.ok('Not found in BD');
                if (info) return res.ok(info);
            })
    }

};
const bgu = (req,res,id,mod)=>{
    if (!req.body.params){
            mongoose.model('avatar')
                .create(req.body, (err, doc)=>{
                if (err) return res.serverError(err);
                let obj={};
                obj[mod] = doc._id;
                mongoose.model('establishment')
                    .findOneAndUpdate({_id:id},obj, {new: true})
                    .populate({path: mod,select:'larg _id'})
                    .select(mod+' -_id')
                    .exec((err,info)=>{
                        if (err) return res.serverError(err);
                        if (!info) return res.ok('Not found bg');
                        if (info) return res.ok(info);
                    })
            });
    }else if(req.body.params){
        let obj={};
        mongoose.model('avatar')
            .findOneAndUpdate({_id:req.body.params},req.body, {new: true})
            .select('larg _id')
            .exec((err,info)=>{
                if (err) return res.serverError(err);
                if (!info) return res.ok('Not found bg');
                if (info){
                    obj[mod]=info;
                    return res.ok(obj)
                }
            })
    }else{
        return res.badRequest('error');
    }
};
const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    if (req.params['id']){
        switch (req.query.select){
            case 'bg': bg(req,res,req.params.id,req.query.select); break;
            case 'av': bg(req,res,req.params.id,req.query.select); break;
            case 'minPrice': min(req,res,req.params.id,req.query.select); break;
            case 'myest': est(req,res,req.params.id,req.query.select); break;
            default: oth(req,res,req.params.id,req.query.select); break;
        }
    }else{
        next();
    }
};
const preUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    req.body.mobile = req.body.mobile.replace(new RegExp(" ", 'g'), "");
    if (req.params){
        switch (req.query.select){
            case 'bg': bgu(req,res,req.params.id,req.query.select); break;
            case 'av': bgu(req,res,req.params.id,req.query.select); break;
            case 'subdomain': subu(req,res,req.params.id,req.query.select); break;
            case 'minPrice': minu(req,res,req.params.id,req.query.select); break;
            case 'myest': estu(req,res,req.params.id,req.query.select); break;
            default: othu(req,res,req.params.id,req.query.select); break;
        }
    }else{
        next();
    }
};
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    let id = req.body.id;
    let model = req.body.model;
    let obj = {};
    req.body['ownerEst'] = id;
    mongoose.model('oneest').create(req.body, (err, doc)=>{
        if(err) return res.badRequest(err);
        if(doc){
            mongoose.model('establishment')
                .findOneAndUpdate({_id:id},
                    {$push:{myest:doc._id}}, {new: true})
                .exec((err,info)=>{
                    if (err) return res.serverError(err);
                    if (!info) return res.ok('Not found bg');
                    if (info) {
                        obj[model] = doc;
                        return res.ok(obj);
                    }
                })
        }
    });
};

const preDelete = (req,res,next)=> {
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next()
};

const werify = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    mongoose.model('oneest')
        .findOne({_id: req.params.id})
        .select('ownerEst')
        .exec((err, result) => {
            if (err) return res.badRequest(err);
            if (!result) return res.notFound();
            if (result) {
                mongoose.model('user')
                    .findOne({_id:req.userId, myEstablishment:{$in:result.ownerEst}})
                    .exec((err,doc)=>{
                    if (err) return res.badRequest(err);
                    if (!doc) return res.notFound();
                    if (doc) {
                        delModelForEst(result.ownerEst,req.params.id);
                        delete req.body['ownerEst'];
                        next()
                    }
                });
            }
        });

};

const delModelForEst = (chainId, estId)=>{
    mongoose.model('establishment')
        .findOneAndUpdate({_id:chainId}, {$pull:{myest:estId}}).exec()
};

glob.restify.serve(
    glob.route,
    mongoose.model('oneest'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getOwner, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getOwner, preCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, werify, preDelete],
    });