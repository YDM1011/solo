const mongoose = require('mongoose');
module.exports = (req, res, next) => {
    mongoose.model('user')
        .findOne({_id: req.params.id})
        .where({verify: true})
        .select('-pass -token -_id')
        .populate({path: 'myFriends', select:"firstName lastName _id"})
        .populate({path: 'bg photo'})
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            if(!info) return res.ok({mes:'You are not valid'});
            info.license = String(req.license);
            return res.ok([info, req.license])
        });
};