const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    login: {type: String, unique: true, required: [true, "Login must be created"]},
    pass: {type: String, unique: true, required: [true, "Password must be created"]},
    firstName: {type: String, required: [true, "First name must be created"]},
    lastName: {type: String, required: [true, "Last name must be created"]},
    email: String,
    gender: String,
    hash: String,
    bornedData: String,
    bornedPlace: String,
    education: String,
    mobile: {type: String},
    address: String,
    aboutme: String,
    worksPlace: String,
    familyStatus: {
        label: String,
        name: String,
        personId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        personName: String,
        person: {type: Boolean, default: false}
    },
    verify:{type: Boolean, default: false},
    favoritest:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "establishment"
    },
    favoritdish:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "dish"
    }],
    choiceest:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "establishment"
    }],
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
        ref: "galery"
    }],
    meetFriend:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    offer:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    myEstablishment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "establishment"
    }],
    photo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "galery"
    },
    bg:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "galery"
    },
    token: String,
    hashLink: String,
    owner: String,
    foodcoin: Number,
    data: {type: Date, default: new Date()}
},{
    toJSON: {
        transform: function (doc, ret) {
            delete ret.pass;
            delete ret.token;
            delete ret.hash;
            delete ret.hashLink;
        }
    },
    toObject: {
        transform: function (doc, ret) {
            delete ret.pass;
            delete ret.token;
            delete ret.hash;
            delete ret.hashLink;
        }
    },
    createRestApi: true,
    strict: true,
    paths: {
        "familyStatus" : Object,
        "familyStatus.personId" : Object
    }
});
const User = mongoose.model('user', user);

module.exports = User;

const glob = require('glob');
const preUpdate = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    delete req.body.mobile;
    delete req.body.pass;
    delete req.body.token;
    delete req.body.hash;
    mongoose.model('user')
        .findOneAndUpdate({_id: req.userId}, req.body, {new:true})
        .select('-pass -token -_id -hashLink')
        .exec((err, info) => {
            if(err) return res.badRequest(err);
            if(!info) return res.notFound('You are not valid');
            return res.ok(info)
        });
};
const oth = (req,res)=>{
    User.count({}, function(err, c) {
        if(err) return res.badRequest(err);
        if(!c) return res.notFound("");
        res.ok({count: c})
    });
};
const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    if (req.query.populate || req.params || req.query.select){
        return next();
    }else
    if (!req.query.query){
        mongoose.model('user')
            .find({})
            .where({verify: true})
            .select('-pass -token -login -hashLink')
            .populate({path:'photo'})
            .populate({path:'bg'})
            .exec((err, info) => {
                if(err) return res.badRequest('Something broke!');
                if(!info) return res.notFound('You are not valid');
                return res.ok(info)
            });
    }else if(req.query.query){
        let id = (JSON.parse(req.query.query)._id);
        mongoose.model('user')
            .findOne({_id: id})
            .where({verify: true})
            .select('-pass -token -login -hashLink')
            .populate({path:'photo'})
            .populate({path:'bg'})
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
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.isProfile, preUpdate],
        preRead: [glob.jsonParser, glob.cookieParser, preRead],
        outputFn: async (req, res) => {
            const result = [];
            const statusCode = req.erm.statusCode;
            if (req.erm.result.length > 0){
                req.erm.result.forEach( (item)=>{
                    delete item.pass;
                    delete item.token;
                    delete item.hash;
                    if (item.login != 'admin'){
                        result.push(item)
                    }
                });
                return await res.status(statusCode).json(result)
            }else{
                return await res.status(statusCode).json(req.erm.result)
            }



        }
    });