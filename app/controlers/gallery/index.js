const mongoose = require('mongoose');
const Gallery = mongoose.model('galery');
module.exports.getPhoto = (req, res, next) => {
    Gallery
        .find({owner: req.query.userId, forGallery: true})
        .sort({date:-1})
        .exec((err, content) =>{
            if(err) {
                res.send(err)
            } else {
                return res.ok(content)
            }
        });
};

