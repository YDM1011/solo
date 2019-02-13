const mongoose = require('mongoose');
const glob = require('glob');

glob.getOwner = (req,res,next)=>{
    require("express");
    require("../responces/serverError")(req, res);
    require("../responces/forbidden")(req, res);
    const Est = mongoose.model('establishment');
    if (req.adminLogin == "admin"){
        return next()
    }else {
        if (req.params.id) {
            Est.findOne({owner: req.ownerId, _id: req.params.id})
                .select('_id')
                .exec((err, result) => {
                    if (err) return res.badRequest(err);
                    if (!result) return res.forbidden('forbidden');
                    if (result) {
                        return next()
                    }

                })
        } else {
            Est.findOne({owner: req.ownerId})
                .select('_id')
                .exec((err, result) => {
                    if (err) return res.badRequest(err);
                    if (!result) return res.forbidden('forbidden');
                    if (result) {
                        return next()
                    }

                })
        }

    }
};