const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
    name: String,
    about: String,
    price: Number,
    owneruser: String,
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

mongoose.model('ingredient', model);

const glob = require('glob');

glob.restify.serve(
    glob.route,
    mongoose.model('ingredient'),
    {
        preRead: [glob.jsonParser, glob.cookieParser, glob.getId],
        preUpdate: [glob.jsonParser, glob.cookieParser, glob.getId],
        preCreate: [glob.jsonParser, glob.cookieParser, glob.getId],
    });