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
        }
    },
    toObject: {
        transform: function (doc, ret) {
        }
    },
    createRestApi: true,
    strict: true
});

mongoose.model('user', pages);

const glob = require('glob');
const preUpdate = (req,res,next)=>{
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
glob.restify.serve(
    glob.route,
    mongoose.model('user'),
    {
        preUpdate: [glob.jsonParser, glob.isAuth, preUpdate]
    });