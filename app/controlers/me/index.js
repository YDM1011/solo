const mongoose = require('mongoose');
const User = mongoose.model('user');
module.exports.myProfile = (req, res, next) => {
    User
        .findOne({_id: req.userId})
        .select("-token -pass -login")
        .populate({path: "photo", select:"imgMin"})
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            if(info){
                res.ok(info)
            }
            if(!info){return res.badRequest('Something broke!');}
        });
};