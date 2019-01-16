const mongoose = require('mongoose');
const User = mongoose.model('galery');
module.exports.getPhoto = (req, res, next) => {
    User
        .find({owner: req.query.userId})
        .exec((err, content) =>{
            if(err) {
                res.send(err)
            } else {
                return res.ok(content)
            }
        });
};