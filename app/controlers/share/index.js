const mongoose = require('mongoose');
const Post = mongoose.model('post');
module.exports = (req, res, next) => {
    Post
        .findOne({_id: req.body.postId})
        .select('-commentId -like -_id -__v')
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            if(!info) return res.notFound('You are not valid');
            let postObj = {};
            let obj = {
                des: req.body.des,
                userIdShare: req.userId,
                data:  info.data
            };
            postObj.img = info.img;
            postObj.data = new Date();
            postObj.des = info.des;
            postObj.userId = info.userId;
            postObj.withFriend = info.withFriend;
            postObj.inPlace = info.inPlace;
            postObj.imression = info.imression;
            postObj.id = req.userId;
            postObj.share = obj;
            Post.create(postObj, (err, content) =>{
                if(err) {
                    res.send(err)
                } else {
                    return res.ok(content)
                }
            })
        });
};
/** body need *
postId
des
 /api/share
**************/