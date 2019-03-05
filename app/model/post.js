const mongoose = require('mongoose');
const data = require('../config/config').data;
const fs = require('fs');
const sharp = require('sharp');
const Schema = mongoose.Schema;

const friend = new Schema({
    id: String,
    firstName: String
});
const place = new Schema({
    id: String,
    place: String
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
    shareCount: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    commentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    img: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "galery"
    }],
    data: {type: Date, default: new Date()},
    withFriend: [friend],
    inPlace: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "establishment"
        },
        place: String
    },
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
        "inPlace.id": [Object],
        "inPlace.place": [String],
        inPlace: [Object],
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
    req.body.inPlace.id = req.body.inPlace.id || null;
    if (req.body.inPlace.id){
        mongoose.model('establishment')
            .findOneAndUpdate({_id:req.body.inPlace.id},{$inc:{postCount:1}}, ()=>{});
    }
    new Promise((resolve, reject)=>{
        let imgArr = [];
        if (req.body.img.length < 1) resolve(imgArr);
        for(let i = 0; i<req.body.img.length; i++){
            let img = req.body.img[i];
            upload(img, (prefics)=>{
                img.picCrop = `/${prefics}${img.fileName}`;
                img.picMedia = `${prefics}${img.fileName}`;
                img['forGallery'] = true;
                img['owner'] = req.userId;
                mongoose.model('galery').create(img, (err, docImg)=>{
                    if(err) return res.badRequest('Something broke!');
                    console.log(docImg._id);
                    imgArr.push(docImg._id);
                    if (img == req.body.img[req.body.img.length-1]){
                        resolve(imgArr)
                    }
                })
            });
        }
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
const upload = (img,next)=>{
    let base64Data;
    if (img.base64crop.search("image/jpeg") >= 0){
        base64Data = img.base64crop.replace(/^data:image\/jpeg;base64,/, "");
    } else
    if (img.base64crop.search("image/png") >= 0){
        base64Data = img.base64crop.replace(/^data:image\/png;base64,/, "");
    }
    let prefics = new Date().getTime();
    base64Data = convertation(base64Data);
    let fileName = `${prefics}${img.fileName}`;
    fs.writeFile(`upload/${prefics}${img.fileName}`, base64Data, 'binary', function(err) {
        require("../controlers/uploadFile").minification(fileName,base64Data,"post_img");
        next(prefics)
    });
};

const convertation = b64string =>{
    if (typeof Buffer.from === "function") {
        return Buffer.from(b64string, 'base64'); // Ta-da
    } else {
        return new Buffer(b64string, 'base64'); // Ta-da
    }
};

const preRead = (req,res,next)=>{

    let optionFind = req.query.query ? JSON.parse(req.query.query) : {};


    if (req.query.limit || (req.query.skip && optionFind)){
        require("../responces/ok")(req, res);
        require("../responces/badRequest")(req, res);
        require("../responces/notFound")(req, res);
        req.body.userId = req.userId;
        mongoose.model('post')
            .find(optionFind)
            .limit(16)
            .sort({data: -1})
            .skip(parseInt(req.query.skip))
            .populate({path:'inPlace.id', select: 'name _id av subdomain',
                populate:{path: 'av', select:'preload _id'}})
            .populate({path:'userId', select:'_id firstName photo lastName',
                populate:{path: 'photo'}})
            .populate({path:'share.userIdShare', select:'_id photo firstName lastName',
                populate:{path: 'photo'}})
            .populate(
                {path:'commentId', select:'_id des data userIdCom likeCom',
                    populate:{path: 'userIdCom likeCom', select:'_id photo firstName lastName',
                        populate:{path: 'photo'}}})
            .exec((err, info) => {
                if(err) return res.badRequest(err);
                if(!info) return res.notFound('You are not valid');
                // next();
                return res.ok(info);
            });
    }else{ return next()}

};

const preDelete = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/badRequest")(req, res);
    require("../responces/notFound")(req, res);
    let fileManeger = require("../controlers/uploadFile");

    mongoose.model('post')
        .findOne({_id:req.params.id})
        .exec((err,info)=>{
            if(err) return res.badRequest(err);
            if(!info) return res.notFound('You are not valid');
            if(info){
                let id = mongoose.Types.ObjectId(info.userId).toString();
                let idS = mongoose.Types.ObjectId(info.share.userIdShare).toString();
                if (info.inPlace.id){
                    mongoose.model('establishment')
                        .findOneAndUpdate({_id:info.inPlace.id},{$inc:{postCount:-1}}, ()=>{});
                }
                if(req.userId == id || req.userId == idS){
                    asyncForEach(info.img, async (img) => {
                        await new Promise(async (resolve,reject)=> {
                            await fileManeger.delFileById(img, res,  ()=>{resolve()})
                        });
                    });
                    next()
                } else { res.badRequest(info) }
            }
        })
};

const checkOwner = (req,res,next)=>{

};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

glob.restify.serve(
    glob.route,
    mongoose.model('post'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, preRead],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId, preCreate],
        preDelete: [glob.jsonParser, glob.cookieParser, glob.getId, preDelete],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId, preSave]
    });