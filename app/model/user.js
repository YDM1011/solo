const mongoose = require('mongoose');
const menuList = mongoose.Schema;
const pages = new menuList({
    login: String,
    pass: String
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
    strict: false
});

mongoose.model('user', pages);