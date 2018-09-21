const mongoose = require('mongoose');
const Post = mongoose.model('post');
module.exports = (req, res, next) => {
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
                        {$pull:{like:req.userId}},
                        (err, content) =>{
                            if(err) {
                                res.send(err)
                            } else {
                                return res.ok({id:content})
                            }
                        });
                // return res.notFound('like is active');
            }
            if(!info){
                Post
                    .findOneAndUpdate({_id: req.body.postId},
                        {$push:{like:req.userId}},
                        (err, content) =>{
                            if(err) {
                                res.send(err)
                            } else {
                                return res.ok({id:content.like})
                            }
                        });

            }

        });
};