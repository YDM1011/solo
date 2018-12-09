const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
    name: String,
    maincategory: String,
    globcategory: String,
    data: {type: Date, default: new Date()}
},{
    toJSON: {
        transform: function (doc, ret) {},
    },
    toObject: {
        transform: function (doc, ret) {},
        virtuals: false
    },
    createRestApi: true,
    strict: true
});

mongoose.model('maincategory', model);

const glob = require('glob');

const preRead = (req,res,next)=>{
    require("../responces/ok")(req, res);
    require("../responces/notFound")(req, res);
    require("../responces/badRequest")(req, res);
    next();
};

glob.restify.serve(
    glob.route,
    mongoose.model('category'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, glob.getId, preRead]
    });