const mongoose = require('mongoose');
const User = mongoose.model('user');
const Est = mongoose.model('establishment');



const getFavoriteE = (req, res, next) => {

    switch(req.params.key){
        case 'favorite': getFavoritEst(req,res,'favorite'); break;
        case 'thebest': getFavoritEst(req,res,'thebest'); break;
        default: res.badRequest('Key is wrong'); break;
    }
};

const favoritEst = (req,res,favEst)=>{
    let activeObj = {
        _id: req.userId,
        favoritest:{$in: favEst._id}
    };
    User
        .findOne(activeObj)
        .select("-token -pass -login")
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            // info.like = info.like || [];
            // info.like.push(req.userId);
            if(info){
                User
                    .findOneAndUpdate({_id: req.userId},
                        {favoritest: null}, {new: true})
                    .exec((err, content) =>{
                        if(err) {
                            return res.send(err)
                        } else {

                        }
                    });
                Est
                    .findOneAndUpdate({_id: favEst._id},
                        {$pull:{thebest: req.userId}}, {new: true})
                    .exec((err, content) =>{
                        if(err) {
                            return res.send(err)
                        } else {
                            res.ok(content.thebest)
                        }
                    });
                // return res.notFound('like is active');
            }
            if(!info){
                User
                    .findOneAndUpdate({_id: req.userId},
                        {favoritest: favEst._id}, {new: true})
                    .exec((err, content) =>{
                        if(err) {
                            return res.send(err)
                        } else {

                        }
                    });
                Est
                    .findOneAndUpdate({_id: favEst._id},
                        {$push:{thebest: req.userId}}, {new: true})
                    .exec((err, content) =>{
                        if(err) {
                            return res.send(err)
                        } else {
                            res.ok(content.thebest)
                        }
                    });
            }

        });
};
const favoritEsts = (req,res,favEst)=>{
    let activeObj = {
        _id: req.userId,
        choiceest:{$in: favEst._id}
    };
    User
        .findOne(activeObj)
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            // info.like = info.like || [];
            // info.like.push(req.userId);
            if(info){
                User
                    .findOneAndUpdate({_id: req.userId},
                        {$pull:{choiceest:favEst._id}}, {new: true})
                    .exec((err, content) =>{
                        if(err) {
                            return res.send(err)
                        } else {

                        }
                    });
                Est
                    .findOneAndUpdate({_id: favEst._id},
                        {$pull:{favorite: req.userId}}, {new: true})
                    .exec((err, content) =>{
                        if(err) {
                            return res.send(err)
                        } else {
                            res.ok(content.favorite)
                        }
                    });
                // return res.notFound('like is active');
            }
            if(!info){
                User
                    .findOneAndUpdate({_id: req.userId},
                        {$push:{choiceest:favEst._id}}, {new: true})
                    .exec((err, content) =>{
                        if(err) {
                            return res.send(err)
                        } else {

                        }
                    });
                Est
                    .findOneAndUpdate({_id: favEst._id},
                        {$push:{favorite: req.userId}}, {new: true})
                    .exec((err, content) =>{
                        if(err) {
                            return res.send(err)
                        } else {
                            res.ok(content.favorite)
                        }
                    });
            }

        });
};
const getFavorit = (req,res,mod)=>{
    User
        .findOne({_id: req.userId})
        .populate({path:mod})
        .select(mod)
        .exec((err, content) =>{
            if(err) {
                return res.badRequest(err);
            }
            if(!content) {
                return res.notFound("not Found");
            }
            if(content) {
                res.ok(content)
            }
        });
};
const getFavoritEst = (req,res,mod)=>{
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    Est.findOne({subdomain:est})
        .select(mod)
        .exec((err,favEst)=>{
        if(err) return res.badRequest(err);
        if(!favEst) return res.badRequest('error');
        if(favEst) return res.ok(favEst);
    });
};
module.exports.myProfile = (req, res, next) => {
    User
        .findOne({_id: req.userId})
        .select("-token -pass -login")
        .populate({path: "photo", select:"imgMin"})
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            if(info){
                res.ok(info)
            }
            if(!info){return res.badRequest('Something broke!');}
        });
};
module.exports.getFriend = (req, res, next) => {
    User
        .findOne({_id: req.userId})
        .select("-token -pass -login")
        .populate({path: "myFriends", populate:{path:'photo',select:"imgMin"}})
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            if(info){
                res.ok(info)
            }
            if(!info){return res.badRequest('Something broke!');}
        });
};
module.exports.favorite = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    Est.findOne({subdomain:est}).exec((err,favEst)=>{
       if(err) return res.badRequest(err);
       if(!favEst) return res.badRequest('error');
       if(favEst){
           switch(req.body.key){
               case 'oneest': favoritEst(req,res,favEst); break;
               case 'est': favoritEsts(req,res,favEst); break;
               case 'dish': favoritEst(req,res,favEst); break;
               default: res.badRequest('Key is wrong'); break;
           }
       }
    });
};

module.exports.getFavorite = (req, res, next) => {

    switch(req.params.key){
        case 'favoritest': getFavorit(req,res,'favoritest'); break;
        case 'est': getFavorit(req,res,'choiceest'); break;
        case 'dish': getFavorit(req,res,'favoritdish'); break;
        default: getFavoriteE(req, res, next); break;
    }
};

