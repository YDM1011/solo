const mongoose = require('mongoose');
const Post = mongoose.model('post');
const Comment = mongoose.model('comment');
module.exports.put = (req, res, next) => {
    console.log(req.body.postId);
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
    console.log(req.body._id);
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