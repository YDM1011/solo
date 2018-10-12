const mongoose = require('mongoose');
const User = mongoose.model('user');
module.exports.isInvite = (req, res, next) => {
    console.log(String(req.userId) == req.body.userId, req.body.userId);
    if(String(req.userId) == req.body.userId){
        return res.send({error:"Something broke!"});
    }

    User
        .findOne({_id: req.userId, offer:{$in: req.body.userId}})
        .populate({path:"offer", select:"_id photo firstName lastName"})
        .exec((err, info)=>{
            if(err) return res.badRequest('Something broke!');
            if(info){
                return res.send({isInvite:'offer', info})
            }else{
                User
                    .findOne({_id: req.userId, invite:{$in: req.body.userId}})
                    .exec((err, info)=>{
                        if(err) return res.badRequest('Something broke!');
                        if(info){
                            res.send({isInvite:true})
                        }
                        if(!info){
                            User
                                .findOne({_id: req.userId, myFriends:{$in: req.body.userId}})
                                .exec((err, content)=>{
                                    if(err) return res.badRequest('Something broke!');
                                    if(content){
                                        User
                                            .findOne({_id: req.userId,
                                                meetFriend:{$in: req.body.userId}})
                                            .exec((err, content)=>{
                                                if(err) return res.badRequest('Something broke!');
                                                if(content){
                                                    res.send({isInvite:"friend",
                                                        isFriend:"friend",
                                                        isMeet:"meetFriend"})
                                                }else if(!content){
                                                    res.send({isInvite:"friend"})
                                                }
                                            });
                                    }else if(!content){
                                        res.send({isInvite: false})
                                    }
                                });
                        }
                    })
            }
        });
};
module.exports.delFriend = (req, res, next) => {
    User
        .findOneAndUpdate({_id: req.userId},
            {$pull:{myFriends:req.body.userId, meetFriend:req.body.userId}},
            {new: true})
        .exec((err, content) =>{
            if(err) {
                res.send(err)
            } else {
                User
                    .findOneAndUpdate({_id: req.body.userId},
                        {$pull:{myFriends:req.userId, meetFriend:req.userId}},
                        {new: true})
                    .select('_id firstName lastName photo')
                    .exec((err, content) =>{
                        if(err) {
                            res.send(err)
                        } else {
                            return res.ok(content)
                        }
                    });
            }
        });
};
module.exports.offerFriend = (req, res, next) => {
    User
        .findOneAndUpdate({_id: req.userId},
            {$push:{myFriends:req.body.userId}, $pull:{offer:req.body.userId}}, {new: true})
        .exec((err, content) =>{
            if(err) {
                res.send(err)
            } else {
                User
                    .findOneAndUpdate({_id: req.body.userId},
                        {$push:{myFriends:req.userId},
                        $pull:{invite:req.userId}}, {new: true})
                    .select('_id firstName lastName photo')
                    .exec((err, content) =>{
                        if(err) {
                            res.send(err)
                        } else {
                            return res.ok(content)
                        }
                    });
            }
        });
};
module.exports.meetFriend = (req, res, next) => {
    User
        .findOne({_id: req.userId, myFriends: {$in: req.body.userId}})
        .exec((err,info)=>{
            if(err){
                return res.send({error:"Something broke!"});
            }
            if(info){
                User
                    .findOneAndUpdate({_id: req.userId},
                        {$push:{meetFriend:req.body.userId}}, {new: true})
                    .select('_id firstName lastName photo')
                    .exec((err, content) =>{
                        if(err) {
                            res.send(err)
                        } else {
                            return res.ok(content)
                        }
                    });
            }
            if(!info){
                return res.send({error:"Something broke!"});
            }
        });

};
module.exports.delMeetFriend = (req, res, next) => {
    User
        .findOneAndUpdate({_id: req.userId},
            {$pull:{meetFriend:req.body.userId}}, {new: true})
        .select('_id firstName lastName photo')
        .exec((err, content) =>{
            if(err) {
                res.send(err)
            } else {
                return res.ok(content)
            }
        });
};
module.exports.getFriends = (req, res, next) => {
    // populate:{path:"photo bg", select:"preload _id"}
    User
        .findOne({_id: req.query.userId})
        .populate({path:'myFriends', select:"firstName lastName _id",
            populate:{path:"photo bg", select:"preload _id"}})
        .select("myFriends")
        .exec((err, content) =>{
            if(err) {
                res.send(err)
            } else {
                return res.ok(content)
            }
        });
};
module.exports.invite = (req, res, next) => {
    console.log(req.body.postId);
    if(String(req.userId) != req.body.userId) {
        User
            .findOne({_id: req.userId, myFriends: {$in: req.body.userId}})
            .exec((err, info) => {
                if (err) return res.badRequest('Something broke!');
                if (info) {
                    return res.badRequest('Something broke!');
                } else if (!info) {
                    User
                        .findOne({_id: req.userId, invite: {$in: req.body.userId}})
                        .exec((err, info) => {
                            if (err) return res.badRequest('Something broke!');
                            if (info) {
                                User
                                    .findOneAndUpdate({_id: req.userId},
                                        {$pull: {invite: req.body.userId}}, {new: true})
                                    .exec((err, content) => {
                                        if (err) {
                                            res.send(err)
                                        } else {
                                            User
                                                .findOneAndUpdate({_id: req.body.userId},
                                                    {$pull: {offer: req.userId}}, {new: true})
                                                .select('_id firstName lastName photo')
                                                .exec((err, info) => {
                                                    if (err) {
                                                        res.send(err)
                                                    } else if (info) {
                                                        return res.ok(info)
                                                    }
                                                });
                                        }
                                    });
                            }
                            if (!info) {
                                User
                                    .findOneAndUpdate({_id: req.userId},
                                        {$push: {invite: req.body.userId}}, {new: true})
                                    .exec((err, content) => {
                                        if (err) {
                                            res.send(err)
                                        } else {
                                            User
                                                .findOneAndUpdate({_id: req.body.userId},
                                                    {$push: {offer: req.userId}}, {new: true})
                                                .select('_id firstName lastName photo')
                                                .exec((err, info) => {
                                                    if (err) {
                                                        res.send(err)
                                                    } else if (info) {
                                                        return res.ok(info)
                                                    }
                                                });

                                        }
                                    });
                            }

                        });
                }
            });
    } else{
        res.send({error:"Something broke!"});
    }
};