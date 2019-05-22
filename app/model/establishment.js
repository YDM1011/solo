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
    placeholder: String,
    icon: String
},{strict: false});

const model = new Schema({
    subdomain: {type: String, unique: true},
    minPrice: {type: Number, defoult: 100, min: [100, 'broken']},
    name: String,
    publicKey: String,
    privatKey: String,
    mobile: {type: String},
    build: [onebuild],
    worksTime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "timeWork"
    },
    about: String,
    mail: String,
    mailOfOrder: String,
    links: Object,
    own: String,
    isOnline:{type: Boolean, default: false},
    isCart:{type: Boolean, default: false},
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
    favoriteCount: {type: Number, default: 0},
    thebest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    thebestCount: {type: Number, default: 0},
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
    myestCount: {type: Number, default: 0},
    postCount: {type: Number, default: 0},
    foodCoin: {type: Number, default: 0},
    permisions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    data: {type: Date, default: new Date()},
},{
    toJSON: {
        transform: function (doc, ret) {},
        virtuals: true
    },
    toObject: {
        transform: function (doc, ret) {},
        virtuals: true
    },
    createRestApi: true,
    strict: true,
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

const getPic = (req,res, est)=>{
    return new Promise(async (resolve,reject)=>{
        let ra = [];
        await asyncForEach(est, async (es) => {
            es =  await new Promise((resolve,reject)=> {
                mongoose.model('establishment')
                    .findOne({_id: es._id})
                    .populate({path:'av bg'})
                    .exec((err, result) => {
                        // console.log(result)
                        if (err) resolve(null);
                        if (!result) resolve(null);
                        if (result) resolve(result);
                    })
            });
            ra.push(es);
        });

        resolve(ra)
    });
};
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
const fl = (req,res)=>{
    mongoose.model('establishment').aggregate(
        [
            { "$project": {
                    "length": { "$size": "$favorite" }
                }},
            { "$sort": { "length": -1 } },
            { "$limit": 10 }
        ],
        async function(err,results) {
            if (err) return res.serverError(err);
            if (!results) return res.ok('Not found bg');
            if (results)  {
                let r = await getPic(req,res,results);
                res.ok(r)
            }
        }
    )
};
const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    require("../responces/serverError")(req, res);
    if (req.params['id'] == "topEst"){
        return fl(req,res)
    }
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
    if(!req.adminLogin) delete req.body['foodCoin'];
    if (req.params){
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
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getAdmin, glob.getOwner, preUpdate],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getOwner, preCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, glob.getAdmin, glob.getOwner, preDelete],
    });