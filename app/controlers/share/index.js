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
                data: info.share.data || info.data
            };
            postObj.img = info.img;
            postObj.data =  new Date();
            postObj.des = info.des;
            postObj.userId = info.userId;
            postObj.withFriend = info.withFriend;
            postObj.inPlace = info.inPlace;
            postObj.imression = info.imression;
            postObj.id = req.userId;
            postObj.share = obj;
            Post.create
            (postObj, {new: true}, (err, content) =>{
                if(err) {
                    res.send(err)
                } else {
                    Post
                        .findOne({_id: content._id})
                        .sort({data: -1})
                        .populate({path:'img', select: '_id preload'})
                        .populate({path:'userId', select:'_id firstName lastName',
                            populate:{path: 'photo', select:'preload _id'}})
                        .populate({path:'share.userIdShare', select:'_id firstName lastName',
                            populate:{path: 'photo', select:'preload _id'}})
                        .populate(
                            {path:'commentId', select:'_id des data',
                                populate:{path: 'userIdCom likeCom', select:'_id firstName lastName',
                                    populate:{path: 'photo', select:'preload'}}})
                        .exec((err, info) => {
                            if(err) return res.badRequest('Something broke!');
                            if(!info) return res.notFound('You are not valid');
                            addCountShareToOwner(req,()=>{
                                res.ok(info);
                            });
                            // return
                        });
                }
            })
        });
};

const addCountShareToOwner = (req,next)=>{
    let id = req.body.postId;
    Post
        .findOne({_id: id, shareCount:{$in: req.userId}})
        .exec((err, info) => {
            console.log(info);
            if(!info){
                Post
                    .findOneAndUpdate({_id: id},
                        {$push:{shareCount:req.userId}}, {new: true})
                    .exec((err, content) =>{

                       if(content){
                           next();
                       }
                    });
            }

        });
};
/** body need *
postId
des
 /api/share
**************/