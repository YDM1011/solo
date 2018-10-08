const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pics = new Schema({
    imgMin: {
        type: String,
    },
    img: {
        type: String,
    },
    imgMax: {
        type: String,
    },
    larg: {
        type: String,
    },
    preload: {
        type: String,
    }
},{
    toJSON: {
        transform: function (doc, ret) {
        }
    },
    toObject: {
        transform: function (doc, ret) {
        }
    },
    createRestApi: true,
    strict: true
});
mongoose.model('avatar', pics);
const preCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/badRequest")(req, res);
    require("../responces/notFound")(req, res);
    req.forImg = req.body.forImg;
    delete req.body.forImg;
    let option = {};
    //шукати юзера з автаром чи шпалерами
    mongoose.model('user')
        .findOne({_id: req.userId})
        .select('-pass -token -_id')
        .exec((err,info)=>{
            if(err) return res.badRequest(err);
            if(!info) return res.badRequest(err);
            if(req.forImg == 'avatar'){
                option = {_id: info.avatar};
            }else if(req.forImg == 'bg'){
                option = {_id: info.bg};
            }else{
                option = {_id: info.avatar};
            }
            mongoose.model('user')
                .findOneAndUpdate({_id: req.userId},
                    {$push:{gallery:option._id}})
                .exec((err, content) =>{
                    if(err) {
                        res.send(err)
                    }
                mongoose.model('avatar')
                    .findOneAndUpdate(option, req.body) //шукати в архіві по аватару чи шпалерам
                    .select("preload _id")
                    .exec((err, doc)=>{
                        if(err) return res.badRequest(err);
                        if(!doc) return next(); //йти до postCreate
                        if(doc){
                            console.log('for bg: ',req.body.forImg);
                            return res.ok(info);
                        }
                    })
            });
        })
};
const postCreate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/badRequest")(req, res);
    require("../responces/notFound")(req, res);
    let option = {};
    if(req.forImg == 'avatar'){
        option = {photo:req.erm.result._id}
    }else if(req.forImg == 'bg'){
        option = {bg:req.erm.result._id}
    }else{
        option = {photo:req.erm.result._id}
    }

    option.$push = {gallery:req.erm.result._id};
    mongoose.model('user')
        .findOneAndUpdate({_id: req.userId}, option)
        .select('-pass -token -_id')
        .populate({path: 'photo', select: 'preload _id'})
        .exec((err,info)=>{
            if(err) return res.badRequest(err);
            if(!info) return res.notFound('You are not valid');
            return res.ok(info)
        });
    // console.log(req.body);
    // next();
};
const glob = require('glob');
glob.restify.serve(
    glob.route,
    mongoose.model('avatar'),{
        preCreate: [glob.jsonParser, glob.getId, preCreate],
        postCreate: [glob.jsonParser, glob.getId, postCreate]
    });


// postCreate: [glob.jsonParser, glob.getId, postCreate],