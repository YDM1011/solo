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

const pages = new Schema({
    des: {
        type: String,
    },
    id: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        unique: true
    }],
    img: Array,
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
    strict: true
});
mongoose.model('post', pages);

const glob = require('glob');
const preSave = (req,res,next)=>{
    require("../responces/ok")(req, res);
    req.body.id = req.body.userId;
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
    req.body.id = req.body.userId;
    next()
};
const preRead = (req,res,next)=>{
    console.log(req.query.limit);
    console.log(req.query.skip);
    console.log(JSON.parse(req.query.query));

    let optionFind = req.query.query ? JSON.parse(req.query.query) : {};

    if (req.query.limit && req.query.skip && optionFind){
        require("../responces/ok")(req, res);
        req.body.userId = req.userId;
        mongoose.model('post')
            .find(optionFind)
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .populate({path:'userId', select:'_id firstName lastName avatar'})
            .populate({path:'like', select:'_id firstName lastName avatar'})
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
        preCreate: [glob.jsonParser, glob.isProfile, preCreate],
        preUpdate: [glob.jsonParser, glob.isProfile, preSave]
    });