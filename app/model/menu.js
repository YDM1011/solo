const mongoose = require('mongoose');
const menuList = mongoose.Schema;
const pages = new menuList({
    label: String,
    link: String
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

mongoose.model('menu', pages);