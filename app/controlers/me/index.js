const mongoose = require('mongoose');
const User = mongoose.model('user');
const Est = mongoose.model('establishment');
const glob = require('glob');


const getFavoriteE = (req, res, next) => {

    switch(req.params.key){
        case 'favorite': getFavoritEst(req,res,'favorite'); break;
        case 'thebest': getFavoritEst(req,res,'thebest'); break;
        default: res.badRequest('Key is wrong'); break;
    }
};

const getFavoriteEByUsId = (req, res, next) => {

    switch(req.params.key){
        case 'favorite': getFavoritEst(req,res,'favorite'); break;
        case 'thebest': getFavoritEst(req,res,'thebest'); break;
        default: res.badRequest('Key is wrong'); break;
    }
};

/**
 *
 * @param req
 * @param res
 * @param favEst
 * if is like not this domain send null
 * if is like on this domain send ok
 * if no like send info of User
 */
const favoritEst = async (req,res,favEst)=>{
    let isLike = await checkFavoriteEst(req,favEst).catch(err=>{return res.badRequest(err)});
    if (typeof isLike === 'object') {
        let result = await setFavotiteEst(req,favEst).catch(err=>{return res.badRequest(err)});
        res.ok(result)
    } else if (isLike === "ok"){
        res.ok({mes:'ok'})
    } else if (isLike === "checked"){
        res.ok({mes:"checked"})
    }
};
/**
 *
 * @param req
 * @param res
 * @param fe
 * procedure for relike favorite est
 * 1 get old id of Est from user
 * 2 set new id to user
 * 3 pull user id from Est
 * 4 push user id for new Est
 */
const resetFavoriteEst = async (req,res,fe)=>{
    let oldEstId = await getOldEstIdAndUpdate (req,fe).catch(e=>{return res.badRequest(e)});
    if(oldEstId){
        await pullEstId(req,oldEstId).catch(e=>{return res.badRequest(e)});
        let result = await pushEstId(req,fe).catch(e=>{return res.badRequest(e)});
        res.ok(result)
    }
};
const checkFavoriteEst = (req,favEst)=>{
    let activeObj = {
        _id: req.userId
    };
    return new Promise((resolv,reject)=>{
        User
            .findOne(activeObj)
            .select("-token -pass -login")
            .exec((err, info) => {
                if(err) reject('Something broke!');
                if(!info) reject(new Error('not found'));
                if(info) {
                    if (!info.favoritest) resolv(info);
                    else if (info.favoritest == toObjectId(favEst._id)) resolv("ok");
                    else resolv("checked");
                }
            });
    })
};
const setFavotiteEst = (req,favEst)=>{
    return new Promise((resolv,reject)=> {
        User
            .findOneAndUpdate({_id: req.userId},
                {favoritest: favEst._id}, {new: true})
            .exec((err, content) => {
                if (err) reject('Something broke!');
                if (!content) reject('Something broke!');
                if (content) Est
                        .findOneAndUpdate({_id: favEst._id},
                            {$push: {thebest: req.userId}}, {new: true})
                        .exec((err, content) => {
                            if (err) reject('Something broke!');
                            else resolv(content.thebest)
                        });
            });
    });
};
const pullEstId = (req,estId)=>{
    return new Promise((resolv,reject)=> {
        Est.findOneAndUpdate({_id: estId}, {$pull: {thebest: req.userId}, $inc:{thebestCount:-1}}, {new:true})
            .select('_id').exec((err, info) => {
            if (err) reject('Something broke!');
            if (!info) reject('Something broke!');
            if (info) resolv(info);
        })
    });
};
const pushEstId = (req,fe)=>{
    return new Promise((resolv,reject)=> {
        Est.findOneAndUpdate({_id: fe._id}, {$push: {thebest: req.userId}, $inc:{thebestCount:1}}, {new:true})
            .select('thebest').exec((err, info) => {
            if (err) reject('Something broke!');
            if (!info) reject('Something broke!');
            if (info) resolv(info.thebest);
        })
    });
};
const getOldEstIdAndUpdate = (req,fe)=>{
    return new Promise((resolv,reject)=> {
        User.findOneAndUpdate({_id: req.userId}, {favoritest:fe._id}).select('favoritest').exec((err, info) => {
            if (err) reject('Something broke!');
            if (!info) reject('Something broke!');
            if (info) resolv(toObjectId(info.favoritest));
        })
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
                        {$pull:{favorite: req.userId}, $inc:{favoriteCount:-1}}, {new: true})
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
                        {$push:{favorite: req.userId}, $inc:{favoriteCount:1}}, {new: true})
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
const getId = (req,res,callbeack)=>{
    const jwt = require('jsonwebtoken');
    const User = mongoose.model('user');
    const protect = req.cookies['sid'];

    if(!protect){
        return res.forbidden("forbidden1");
    }
    const connect = protect.split(" ");

    jwt.verify(connect[0], glob.secret, (err,data)=>{
        if (err) {
            return res.serverError("Token error");
        }else{
            User.findOne({login: data.id })
                .exec((err, info)=>{
                    if (err) return next(err);
                    if (!info) return res.forbidden("forbidden2");
                    req.userId = info._id;
                    req.ownerId = info._id;
                    // req.avatar = info.avatar;
                    callbeack()
                });
        }
    });
};
const getFavorit = (req,res,mod)=>{
    getId(req,res,()=>{
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
    });

};
const getFavoritDish = (req,res,est)=>{
    getId(req,res,()=>{
        User
            .findOne({_id: req.userId})
            .select('favoritdish')
            .exec((err, content) =>{
                if(err) {
                    return res.badRequest(err);
                }
                if(!content) {
                    return res.notFound("not Found");
                }
                if(content) {
                    // res.ok(content)
                    getDishByArr(req, res, content.favoritdish, est)
                }
            });
    });
};
const getDishByArr = (req,res,arr,est)=>{
    Est.findOne({subdomain:est}).select('_id').exec((err,info)=>{
        if(err)  return res.badRequest(err);
        if(!info) return res.notFound("not Found");
        if(info){
            mongoose.model('dish')
                .find({ownerest: info._id, _id:{$in:arr}})
                .limit(6).skip(0)
                .exec((err,infoD)=>{
                if(err)  return res.badRequest(err);
                if(!infoD) return res.notFound("not Found");
                res.ok(infoD);
            })
        }
    })
};

const getFavoritByUsId = (req,res,mod,usId)=>{
    User
        .findOne({_id: usId})
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
        .select("-token -pass -hash")
        .populate({path: "photo"})
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            if(info){
                res.ok(info)
            }
            if(!info){return res.badRequest('Something broke!');}
        });
};
module.exports.userDate = (req, res, next) => {
    User
        .findOne({_id: req.params.id})
        .select("-token -pass -hash")
        .populate({path: "photo bg"})
        .populate({path:"familyStatus.personId", select:"firstName lastName photo"})
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
        .populate({path: "myFriends", populate:{path:'photo'}})
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
    Est.findOne({subdomain:est}).select('_id').exec((err,favEst)=>{
       if(err) return res.badRequest(err);
       if(!favEst) return res.badRequest('error');
       if(favEst){
           switch(req.body.key){
               case 'oneest': favoritEst(req,res,favEst); break;
               case 'est': favoritEsts(req,res,favEst); break;
               case 'dish': favoritEstD(req,res,favEst); break;
               default: res.badRequest('Key is wrong'); break;
           }
       }
    });
};
module.exports.resetEst = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    Est.findOne({subdomain:est}).select('_id').exec((err,favEst)=>{
       if(err) return res.badRequest(err);
       if(!favEst) return res.badRequest('error');
       if(favEst) return resetFavoriteEst(req, res, favEst)
    });
};

module.exports.getFavorite = (req, res, next) => {
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    switch(req.params.key){
        case 'favoritest': getFavorit(req,res,'favoritest'); break;
        case 'est': getFavorit(req,res,'choiceest'); break;
        case 'dish': getFavoritDish(req,res, est); break;
        default: getFavoriteE(req, res, next); break;
    }
};

module.exports.getFavoriteByUsId = (req, res, next) => {

    switch(req.params.key){
        case 'favoritest': getFavoritByUsId(req,res,'favoritest', req.params.usId); break;
        case 'est': getFavoritByUsId(req,res,'choiceest', req.params.usId); break;
        case 'dish': getFavoritByUsId(req,res,'favoritdish', req.params.usId); break;
        default: getFavoriteEByUsId(req, res, next); break;
    }
};

module.exports.dishHit = (req,res,next)=>{
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    Est.findOne({subdomain:est}).select('_id').exec((err,info)=>{
        if(err)  return res.badRequest(err);
        if(!info) return res.notFound("not Found");
        if(info){
            mongoose.model('dish')
                .find({ownerest: info._id, ishit:true})
                .limit(6).skip(0)
                .exec((err,infoD)=>{
                    if(err)  return res.badRequest(err);
                    if(!infoD) return res.notFound("not Found");
                    res.ok(infoD);
                })
        }
    })
};
module.exports.dishHitAll = (req,res,next)=>{
    let est = req.headers.origin.split("//")[1].split(".")[1] ? req.headers.origin.split("//")[1].split(".")[0] : 'solo';
    Est.findOne({subdomain:est}).select('_id').exec((err,info)=>{
        if(err)  return res.badRequest(err);
        if(!info) return res.notFound("not Found");
        if(info){
            mongoose.model('dish')
                .find({ownerest: info._id, ishit:true})
                .populate({path:"pic"})
                .exec((err,infoD)=>{
                    if(err)  return res.badRequest(err);
                    if(!infoD) return res.notFound("not Found");
                    res.ok(infoD);
                })
        }
    })
};

function toObjectId(ids) {

    if (ids.constructor === Array) {
        return ids.map(mongoose.Types.ObjectId);
    }

    return mongoose.Types.ObjectId(ids).toString();
    // mongoose.Types.ObjectId(info.userId).toString();
}