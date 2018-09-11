const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pages = new Schema({
    login: String,
    pass: String,
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