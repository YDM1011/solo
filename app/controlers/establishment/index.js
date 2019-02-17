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

module.exports.getMy = (req, res, next) => {
    Establishment.find({owner: req.ownerId})
        .select("subdomain _id")
        .exec((err,result)=>{
            if(err) return res.badRequest(err);
            if (!result) return res.serverError('Somesing broken');
            if (result) return res.ok(result);
        })
};

module.exports.getLikeEsts = (req, res, next) => {
    User.find({_id: req.params.id})
        .select('choiceest')
        .populate({path:'choiceest', populate:{path:"av"}})
        .limit(6).skip(0)
        .exec((err,result)=>{
            if(err) return res.badRequest(err);
            if (!result[0]) return res.serverError('Somesing broken');
            if (result[0]) return res.ok(result[0].choiceest);
        })
};
module.exports.getLikeDish = (req, res, next) => {
    User.find({_id: req.params.id})
        .select('favoritdish')
        .populate({path:'favoritdish', populate:{path: 'ownerest pic'}})
        .limit(6).skip(0)
        .exec((err,result)=>{

            if(err) return res.badRequest(err);
            if (!result[0]) return res.serverError('Somesing broken');
            if (result[0]) return res.ok(result[0].favoritdish);
        })
};

module.exports.getLikeEstsAll = (req, res, next) => {
    User.find({_id: req.params.id})
        .select('choiceest')
        .populate({path:'choiceest', populate:{path:"av"}})
        .exec((err,result)=>{
            if(err) return res.badRequest(err);
            if (!result[0]) return res.serverError('Somesing broken');
            if (result[0]) return res.ok(result[0].choiceest);
        })
};
module.exports.getLikeDishAll = (req, res, next) => {
    User.find({_id: req.params.id || req.userId})
        .select('favoritdish')
        .populate({path:'favoritdish', populate:{path: 'ownerest pic'}})
        .exec((err,result)=>{

            if(err) return res.badRequest(err);
            if (!result[0]) return res.serverError('Somesing broken');
            if (result[0]) return res.ok(result[0].favoritdish);
        })
};
module.exports.isEst = (req, res, next) => {
    User.findOne({_id: req.userId})
        .select('myEstablishment')
        .exec((err,result)=>{
            if(err) return res.badRequest(err);
            if (!result) return res.serverError('Somesing broken');
            if (result){
                if(!result.myEstablishment) return res.ok({isEst:false});
                if (result.myEstablishment.length>0){
                    return res.ok({isEst:true});
                }else{
                    return res.ok({isEst:false});
                }
            }
        })
};

module.exports.customParams = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
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
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
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
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    if (req.query.type == "count"){
        mongoose.model('post')
            .count({"inPlace.place": est})
            .exec((err,doc)=>{
                if (err) return res.badRequest(err);
                if (!doc) return res.serverError('Somesing broken');
                if (doc) return res.ok({count:doc});
            })
    }else if (req.query.skip){
        mongoose.model('post')
            .find({"inPlace.place": est})
            .populate({path:'userId'})
            .populate({path:'inPlace.id', select:'av name'})
            .populate({path:'commentId', populate:{path:'userIdCom', select:'-token -login'}})
            .limit(4)
            .skip(parseInt(req.query.skip))
            .sort({data: -1})
            .exec((err, doc)=>{
                if (err) return res.badRequest(err);
                if (!doc) return res.serverError('Somesing broken');
                if (doc) return res.ok(doc);
            })
    }else{
        mongoose.model('post')
            .find({"inPlace.place": est, "share.userIdShare":null})
            .populate({path:'userId'})
            .populate({path:'inPlace.id', select:'av name'})
            .populate({path:'commentId', populate:{path:'userIdCom', select:'-token -login'}})
            .limit(4)
            .skip(0)
            .sort({data: -1})
            .exec((err, doc)=>{
                if (err) return res.badRequest(err);
                if (!doc) return res.serverError('Somesing broken');
                if (doc) return res.ok(doc);
            })
    }

};
module.exports.estMenu = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';

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
module.exports.estWorkTime = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';

    Establishment
        .findOne({subdomain: est})
        .populate({path:'worksTime',select:'label'})
        .select('worksTime')
        .exec((err, doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) return res.serverError('Somesing broken');
            if (doc) return res.ok(doc);
        })
};
module.exports.estEst = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';

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
module.exports.estPics = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    // return res.ok(est);
    Establishment
        .findOne({subdomain: est})
        .populate({path:'bg'})
        .populate({path:'av'})
        .select('bg av')
        .exec((err, doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) return res.serverError('Somesing broken');
            if (doc) return res.ok(doc);
        })
};
module.exports.estName = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    // return res.ok(est);
    Establishment
        .findOne({subdomain: est})
        .populate({path:'av'})
        .select('name subdomain _id av')
        .exec((err, doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) return res.serverError('Somesing broken');
            if (doc) return res.ok(doc);
        })
};
module.exports.getDish = (req, res, next) => {
    let id = toObjectId(req.params['id']);
    let userId = toObjectId(req.userId);
    console.log(id, id == req.params['id']);
    mongoose.model('dish')
        .find({owneruser: userId, ownerest: id})
        .populate({path:'dishcategory', select:'name _id'})
        .populate({path:'portion'})
        .populate({path:'pic'})
        .select('dishcategory pic name portion _id')
        .exec((err,info)=>{
            if (err) return res.serverError(err);
            if (!info) return res.notFound('Not found');
            if (info) return res.ok(info);
        })
};
module.exports.checkEst = est => {
    return new Promise((resolve,reject)=>{
        mongoose.model('establishment')
            .findOne({subdomain:est, verify:true})
            .exec((err,info)=>{
            if (err) return reject(err);
            if (!info) return reject({notFound:'Not found'});
            if (info) return resolve(info);
        })
    })
};

function toObjectId(ids) {

    if (ids.constructor === Array) {
        return ids.map(mongoose.Types.ObjectId);
    }

    return mongoose.Types.ObjectId(ids).toString();
    // mongoose.Types.ObjectId(info.userId).toString();
}