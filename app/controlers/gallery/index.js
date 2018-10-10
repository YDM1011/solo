const mongoose = require('mongoose');
const User = mongoose.model('user');
module.exports.getPhoto = (req, res, next) => {
    User
        .findOne({_id: req.query.userId})
        .populate({path:'gallery', select:"preload _id"})
        .select("gallery")
        .exec((err, content) =>{
            if(err) {
                res.send(err)
            } else {
                return res.ok(content)
            }
        });
};