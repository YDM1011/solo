const mongoose = require('mongoose');
module.exports = (req, res, next) => {
    mongoose.model('user')
        .findOne({_id: req.params.id})
        .select('-pass -token -_id')
        .populate({path: 'myFriends', select:"firstName lastName avatar _id"})
        .exec((err, info) => {
            if(err) return res.badRequest('Something broke!');
            // if(!info) return res.notFound('You are not valid');
            info.license = String(req.license);
            console.log(info.license);
            return res.ok([info, req.license])
        });
};
//
// const mongoose = require('mongoose');
// const User = require('../../model/user');
// module.exports = (req, res, next) => {
//     console.log(req.params.id);
//     User
//         .findOne({_id: req.params.id})
//         .select('-pass -token -_id')
//         .exec((err, info) => {
//
//             if(err) return res.badRequest('Something broke!');
//             // if(!info) return res.notFound('You are not valid');
//             // info.license = req.license;
//             return res.ok(info)
//         });
// };