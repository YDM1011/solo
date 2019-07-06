const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data = require('../config/index');
const model = new Schema({
        foodcoin: Number,
        userShow: String,
        order: String,
        orderNumber: String,
        est: String,
        coment: String,
        type: String,
        isShow: {type: Boolean, default: false},
        date: {type: Date, default: Date.now}
    },{
    toJSON: {
        transform: function (doc, ret) {},
    },
    toObject: {
        transform: function (doc, ret) {},
        virtuals: false
    },
    createRestApi: true,
    strict: false
});

const History = mongoose.model('history', model);

module.exports = History;

const glob = require('glob');