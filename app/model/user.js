const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pages = new Schema({
    login: {type: String, required: [true, "Login must be created"]},
    pass: {type: String, required: [true, "Password must be created"]},
    firstName: {type: String, required: [true, "First name must be created"]},
    lastName: {type: String, required: [true, "Last name must be created"]},
    gender: String,
    borned: Date,
    myFriends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    invite:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    gallery:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "avatar"
    }],
    meetFriend:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    offer:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    photo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "avatar"
    },
    bg:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "avatar"
    },
    token: String
},{
    toJSON: {
        transform: function (doc, ret) {
            delete ret.pass;
            delete ret.login;
        },
    },
    toObject: {
        transform: function (doc, ret) {
            delete ret.pass;
            delete ret.login;
        },
        virtuals: false
    },
    createRestApi: true,
    strict: true
});
const User = mongoose.model('user', pages, 'users');
module.exports = User;
const glob = require('glob');
const preUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    mongoose.model('user')
        .findOneAndUpdate({_id: req.userId}, req.body)
        .select('-pass -token -_id')
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            if(!info) return res.notFound('You are not valid');
            return res.ok(info)
        });
};
const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    if (!req.query.query){
        mongoose.model('user')
            .find({})
            .select('-pass -token -login')
            .populate({path:'photo', select:'preload _id'})
            .populate({path:'bg', select:'preload _id'})
            .exec((err, info) => {
                if(err) return res.badRequest('Something broke!');
                if(!info) return res.notFound('You are not valid');
                return res.ok(info)
            });
    }else if(req.query.query){
        let id = (JSON.parse(req.query.query)._id);
        mongoose.model('user')
            .findOne({_id: id})
            .select('-pass -token -login')
            .populate({path:'photo', select:'preload _id'})
            .populate({path:'bg', select:'preload _id'})
            .exec((err, info) => {
                if(err) return res.badRequest('Something broke!');
                if(!info) return res.notFound('You are not valid');
                return res.ok(info)
            });
    }else{
        next()
    }
};

glob.restify.serve(
    glob.route,
    mongoose.model('user'),
    {
        preUpdate: [glob.jsonParser, glob.isProfile, preUpdate],
        preRead: [glob.jsonParser, preRead],
        outputFn: async (req, res) => {
            const result = [];
            const statusCode = req.erm.statusCode;
            req.erm.result.forEach( (item)=>{
                delete item.pass;
                delete item.login;
                delete item.token;
                result.push(item)
            });
            return await res.status(statusCode).json(result)
        }
    });