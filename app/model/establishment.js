const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const onebuild = new Schema({
    label: String,
    adress: String,
    mobile: String,
    worksTime: String,
    data: Date
});
const oneLinks = new Schema({
    url: String,
    label: String
});

const model = new Schema({
    subdomain: {type: String, unique: true},
    minPrice: {type: Number, defoult: 50, min: [50, 'broken']},
    name: String,
    mobile: {type: String},
    build: [onebuild],
    worksTime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "timeWork"
    },
    about: String,
    mail: String,
    links: [oneLinks],
    own: String,
    delivery:{type: Boolean, default: true},
    getself:{type: Boolean, default: true},
    reservation:{type: Boolean, default: true},
    bg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "galery"
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    favorite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    thebest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    av: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "galery"
    },
    verify:{type: Boolean, default: false},
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    myest:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "oneest"
    }],
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

mongoose.model('establishment', model);

const glob = require('glob');

const bg = (req,res,id,model)=>{
    mongoose.model('establishment')
        .findOne({_id:id})
        .populate({path: model}).select(model)
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.ok('Not found bg');
            if (info) return res.ok(info);
        })
};
const est = (req,res,id,model)=>{
    mongoose.model('establishment')
        .findOne({_id:id})
        .populate({path: model,
            populate:{path:'menus'}})
        .select(model+' -_id')
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.ok('Not found bg');
            if (info) return res.ok(info);
        })
};
const oth = (req,res,id,select)=>{
    mongoose.model('establishment')
        .findOne({_id:id})
        .select(select+' -_id')
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.ok('Not found bg');
            if (info) return res.ok(info);
        })
};
const min = (req,res,id,model)=>{
    mongoose.model('establishment')
        .findOne({_id:id})
        .select(model+' -_id')
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.ok('Not found bg');
            if (info) {
                if(!info.minPrice || info.minPrice < 50) {
                    req.body.minPrice = 50;
                    console.log('test0', req.body);
                    othu(req, res, id, model)
                }else{
                    return res.ok(info);
                }
            }
        })
};
const othu = (req,res,id,model)=>{
    delete req.body.subdomain;
    mongoose.model('establishment')
        .findOneAndUpdate({_id:id},req.body,{new:true})
        .select(model+' -_id')
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
    return res.badRequest("Can't be change");
    let errVal = 0;
    let text = '';
    if(req.body.subdomain){
        if(req.body.subdomain.length >= 1
            && req.body.subdomain.length  <= 10){
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
                text = `${est} вже занятий!`;
                return res.badRequest(text);
            }
        }else{
            errVal++;
            text = 'Сабдомен мусить бути не менше 1 символів і не більше 10!';
        }
    }else{
        errVal++;
        text = 'Сабдомен мусить бути не менше 1 символів і не більше 10!';
    }
    
    if (errVal > 0){
        return res.badRequest(text);
    }else{
        mongoose.model('establishment')
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
    require("../responces/serverError")(req, res);
    if (req.query.populate || req.query.query){
        return next();
    }
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
    require("../responces/serverError")(req, res);
    delete req.body['own'];
    delete req.body['owner'];
    if (req.params){
        console.log(req.params);
        switch (req.query.select){
            case 'bg': bgu(req,res,req.params.id,req.query.select); break;
            case 'av': bgu(req,res,req.params.id,req.query.select); break;
            case 'subdomain': subu(req,res,req.params.id,req.query.select); break;
            case 'minPrice': minu(req,res,req.params.id,req.query.select); break;
            default: othu(req,res,req.params.id,req.query.select); break;
        }
    }else{
        next();
    }
};
const preCreate = (req,res,next)=>{
    req.body['owner'] = req.body.owner;
    next();
};
const preDelete = (req,res,next)=>{
    delete req.body['own'];
    delete req.body['owner'];
    next();
};

glob.restify.serve(
    glob.route,
    mongoose.model('establishment'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, preRead],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getOwner, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getOwner, preCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getOwner, preDelete],
    });