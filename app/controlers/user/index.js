const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports.getFoodcoin = (req, res, next) => {
    User.find({foodcoin: 100})        
        .exec((err,doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) {
                return res.serverError('Somesing broken');
            }
            if (doc){
                return res.status(200).json(doc);
            }
        })
};

module.exports.getFoodcoin1 = (req, res, next) => {
    User.update({foodcoin: 10}, {$set: {foodcoin: 10}}, { multi: true })        
        .exec((err,doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) {
                return res.serverError('Somesing broken');
            }
            if (doc){
                return res.status(200).json(doc);
            }
        })
};

module.exports.getFoodcoin3 = (req, res, next) => {
    User.update({firstName: "Альона"}, {$set: {foodcoin: 199}}, { multi: true })        
        .exec((err,doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) {
                return res.serverError('Somesing broken');
            }
            if (doc){
                return res.status(200).json(doc);
            }
        })
};
