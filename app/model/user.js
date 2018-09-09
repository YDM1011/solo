const mongoose = require('mongoose');
const menuList = mongoose.Schema;
const pages = new menuList({
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