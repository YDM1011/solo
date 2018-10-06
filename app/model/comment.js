const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    des: {
        type: String,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    userIdCom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    likeCom: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    data: {type: Date, default: new Date()},

},{
    toJSON: {
        transform: function (doc, ret) {
        }
    },
    toObject: {
        transform: function (doc, ret) {
        },
        virtuals: true
    },
    createRestApi: true,
    strict: true
});
mongoose.model('comment', commentSchema);

const glob = require('glob');

const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    console.log(req.body);
    req.body.userIdCom = req.userId;
    req.body.data =  new Date();
    mongoose.model('comment')
        .create(req.body, {new: true}, (err, info)=>{
        mongoose.model('post')
            .findOneAndUpdate({_id: info.postId},
                {$push: {commentId: info._id}}, {new: true})
            .exec((err, content) => {
                if (err) {
                    return res.send(err)
                } else if (content) {
                    mongoose.model('comment')
                        .findOne({_id:info._id})
                        .populate({path:"userIdCom",
                            populate:{path:"photo",select:"preload _id"}})
                        .exec((err,doc)=>{
                            if (err) return res.send(err);
                            return res.ok(doc)
                        });

                }
            });
        })
};
glob.restify.serve(
    glob.route,
    mongoose.model('comment'),
    {
        preRead: [glob.jsonParser],
        preCreate: [glob.jsonParser, glob.isAuth, preCreate]

    });