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
    usersPost: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    img: String,
    data: {type: Date, default: new Date()},
    withFriend: [friend],
    inPlace: place,
    imression: impresion,
    token: String
},{
    toJSON: {
        transform: function (doc, ret) {
            delete ret.userId.__v;
            delete ret.userId.pass;
            delete ret.userId.token;
            delete ret.userId.login;
        }
    },
    toObject: {
        transform: function (doc, ret) {
            delete ret.userId.__v;
            delete ret.userId.pass;
            delete ret.userId.token;
            delete ret.userId.login;
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
    req.body.usersPost.push(req.body.userId);
    mongoose.model('post')
        .findOneAndUpdate({_id: req.params.id})
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            if(!info) return res.notFound('You are not valid');
            return res.ok(info)
        });
};
const preRead = (req,res,next)=>{
    console.log(req.query.limit);
    console.log(req.query.skip);
    require("../responces/ok")(req, res);
    req.body.userId = req.userId;
    if (req.query.limit && req.query.skip){
        mongoose.model('post')
            .find({})
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .populate({path:'userId', select:'-pass -token -login'})
            .exec((err, info) => {
                if(err) return res.badRequest('Something broke!');
                if(!info) return res.notFound('You are not valid');
                // next();
                return res.ok(info);
            });
    }else{ return next()}


    // next()
};
glob.restify.serve(
    glob.route,
    mongoose.model('post'),
    {
        preRead: [glob.jsonParser, preRead],
        preCreate: [glob.jsonParser, glob.isProfile],
        preUpdate: [glob.jsonParser, glob.isProfile, preSave]
    });