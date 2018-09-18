const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pages = new Schema({
    login: {type: String, required: [true, "Login must be created"]},
    pass: {type: String, required: [true, "Password must be created"]},
    firstName: {type: String, required: [true, "First name must be created"]},
    lastName: {type: String, required: [true, "Last name must be created"]},
    gender: String,
    borned: Date,
    avatar: {
        type: String,
        default: ''
    },
    bg: {
        type: String,
        default: ''
    },
    token: String
},{
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.pass;
            delete ret.token;
            delete ret.login;
        }
    },
    toObject: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.pass;
            delete ret.token;
            delete ret.login;
        },
        virtuals: true
    },
    createRestApi: true,
    strict: true
});
const User = mongoose.model('user', pages, 'users');
module.exports = User;
const glob = require('glob');
const preUpdate = (req,res,next)=>{
    console.log("OK!!");
    require("../responces/ok")(req, res);
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
    console.log(req.params.id);
    if (req.params.id){
        next()
    }else{
        require("../responces/ok")(req, res);
        require("../responces/notFound")(req, res);
        require("../responces/badRequest")(req, res);
        let id = (JSON.parse(req.query.query)._id);
        console.log(id);
        mongoose.model('user')
            .findOne({_id: id})
            .select('-pass -token -_id -login')
            .exec((err, info) => {
                if(err) return res.badRequest('Something broke!');
                if(!info) return res.notFound('You are not valid');
                return res.ok(info)
            });
    }
};
glob.restify.serve(
    glob.route,
    mongoose.model('user'),
    {
        preUpdate: [glob.jsonParser, glob.isProfile, preUpdate],
        preRead: [glob.jsonParser, preRead]
    });