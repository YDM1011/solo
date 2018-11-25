const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friend = new Schema({
    id: String,
    name: String
});
const place = new Schema({
    id: String,
    place: String,
    value: String
});
const impresion = new Schema({
    value: String,
    name: String
});
const sharePost = new Schema({
    des: String,
    userIdShare: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    data: Date
});

const pages = new Schema({
    des: {
        type: String,
    },
    share: sharePost,
    id: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    commentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    img: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "avatar"
    }],
    data: {type: Date, default: new Date()},
    withFriend: [friend],
    inPlace: place,
    imression: impresion,
    token: String
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
    strict: true,
    paths: {
        des: [Object],
        share: [Object],
        id: [Object],
        userId: [Object],
        like: [Object],
        commentId: [Object],
        img: [Object],
        data: [Object],
        withFriend: [Object],
        inPlace: [Object],
        "inPlace.place": [Object],
        imression: [Object],
        token: [Object],
        _id: [Object],
        __v: [Object]
    }
});
mongoose.model('post', pages);
mongoose.model('post');

const glob = require('glob');
const preSave = (req,res,next)=>{
    require("../responces/ok")(req, res);
    req.body.id = req.body.userId;
    delete req.body.img;
    mongoose.model('post')
        .findOneAndUpdate({_id: req.params.id})
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            if(!info) return res.notFound('You are not valid');
            return res.ok(info)
        });
};
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/badRequest")(req, res);
    req.body.id = req.body.userId;
    req.body.data = new Date();
    if(req.body.img.length < 1 && !req.body.des){
        return res.badRequest("Завантажте фото чи напишіть опис публікації")
    }
    new Promise((resolve, reject)=>{
        let imgArr = [];
        if (req.body.img.length < 1) resolve(imgArr);
        req.body.img.forEach(img=>{
            mongoose.model('avatar').create(img, (err, docImg)=>{
                if(err) return res.badRequest('Something broke!');
                imgArr.push(docImg._id);
                if (img == req.body.img[req.body.img.length-1]){
                    resolve(imgArr)
                }
            })
        });
    }).then(arr=>{
        req.body.img = arr;
        mongoose.model('post')
            .create(req.body, (err, content) =>{
                if(err) {
                    res.send(err)
                } else {
                    return res.ok(content)
                }
            });
        mongoose.model('user')
            .findOneAndUpdate({_id: req.userId},
                {$push:{gallery:req.body.img}})
            .exec((err, content) =>{
                if(err) {
                    res.send(err)
                }
        })
    });
    // next()
};
const preRead = (req,res,next)=>{

    let optionFind = req.query.query ? JSON.parse(req.query.query) : {};

    if (req.query.limit && req.query.skip && optionFind){
        require("../responces/ok")(req, res);
        req.body.userId = req.userId;
        mongoose.model('post')
            .find(optionFind)
            .limit(4)
            .sort({data: -1})
            .skip(parseInt(req.query.skip))
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
                // next();
                return res.ok(info);
            });
    }else{ return next()}

};
glob.restify.serve(
    glob.route,
    mongoose.model('post'),
    {
        preRead: [glob.jsonParser, preRead],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.isProfile, preCreate],
        preUpdate: [glob.jsonParser, glob.isProfile, preSave]
    });