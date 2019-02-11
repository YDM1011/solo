const mongoose = require('mongoose');
const Post = mongoose.model('post');
const Comment = mongoose.model('comment');
const Dish = mongoose.model('dish');
const User = mongoose.model('user');
module.exports.put = (req, res, next) => {
    Post
        .findOne({_id: req.body.postId, like:{$in: req.userId}})
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            // info.like = info.like || [];
            // info.like.push(req.userId);
            if(info){
                Post
                    .findOneAndUpdate({_id: req.body.postId},
                        {$pull:{like:req.userId}}, {new: true})
                    .exec((err, content) =>{
                            if(err) {
                                return res.send(err)
                            } else {
                                return res.ok(content.like)
                            }
                        });
                // return res.notFound('like is active');
            }
            if(!info){
                Post
                    .findOneAndUpdate({_id: req.body.postId},
                        {$push:{like:req.userId}}, {new: true})
                    .exec((err, content) =>{
                            if(err) {
                                return res.send(err)
                            } else {
                                return res.ok(content.like)
                            }
                        });
            }

        });
};
module.exports.putCom = (req, res, next) => {
    Comment
        .findOne({_id: req.body._id, likeCom:{$in: req.userId}})
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            // info.like = info.like || [];
            // info.like.push(req.userId);
            if(info){
                Comment
                    .findOneAndUpdate({_id: req.body._id},
                        {$pull:{likeCom:req.userId}}, {new: true})
                    .populate({path:'likeCom', select:'_id firstName lastName photo'})
                    .exec((err, content) =>{
                            if(err) {
                                res.send(err)
                            } else {
                                return res.ok(content.likeCom)
                            }
                        });
            }
            if(!info){
                Comment
                    .findOneAndUpdate({_id: req.body._id},
                        {$push:{likeCom:req.userId}}, {new: true})
                    .populate({path:'likeCom', select:'_id firstName lastName photo'})
                    .exec((err, content) =>{
                            if(err) {
                                res.send(err)
                            } else {
                                return res.ok(content.likeCom)
                            }
                        });
            }

        });
};
module.exports.putDish = (req, res, next) => {
    Dish
        .findOne({_id: req.body._id, dishlike:{$in: req.userId}})
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            // info.like = info.like || [];
            // info.like.push(req.userId);
            if(info){
                Dish
                    .findOneAndUpdate({_id: req.body._id},
                        {$pull:{dishlike:req.userId}}, {new: true})
                    .populate({path:'dishlike', select:'_id firstName lastName photo'})
                    .exec((err, content) =>{
                            if(err) {
                                res.send(err)
                            } else {
                                User
                                    .findOneAndUpdate({_id:req.userId},
                                        {$pull:{favoritdish:req.body._id}},
                                        {new: true}).exec((err, info) =>{
                                    if(err) {
                                        res.send(err)
                                    } else {
                                        return res.ok(content.dishlike)
                                    }
                                });
                            }
                        });
            }
            if(!info){
                Dish
                    .findOneAndUpdate({_id: req.body._id},
                        {$push:{dishlike:req.userId}}, {new: true})
                    .populate({path:'dishlike', select:'_id firstName lastName photo'})
                    .exec((err, content) =>{
                            if(err) {
                                res.send(err)
                            } else {
                                User
                                    .findOneAndUpdate({_id:req.userId},
                                        {$push:{favoritdish:req.body._id}},
                                        {new: true}).exec((err, info) =>{
                                    if(err) {
                                        res.send(err)
                                    } else {
                                        return res.ok(content.dishlike)
                                    }
                                });
                            }
                        });

            }

        });
};