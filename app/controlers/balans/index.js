const mongoose = require('mongoose');
const Establishment = mongoose.model('establishment');
const BasketList = mongoose.model('basketsList');

module.exports.getBalansById = (req, res, next) => {
    
    BasketList
        .find({ownerest: req.params['id'], status: 6})
        .populate({path:"ownerest"})
        .populate({path:"owneruser"})
        .sort({dataUpdate: -1})
        .exec((err, doc)=>{
            if (err) return res.badRequest(err);
            if (!doc) return res.serverError('Somesing broken');
            if (doc) return res.status(200).json(doc);
        })
};