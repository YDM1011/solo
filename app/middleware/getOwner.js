const mongoose = require('mongoose');
const glob = require('glob');

glob.getOwner = (req,res,next)=>{
    require("express");
    require("../responces/serverError")(req, res);
    require("../responces/forbidden")(req, res);
    const Est = mongoose.model('establishment');
    const User = mongoose.model('user');
    if (req.adminLogin == "admin"){
        return next()
    }else {
        if (req.params.id) {
            // Est.findOne({owner: req.ownerId, _id: req.params.id})
            //     .select('_id')
            //     .exec((err, result) => {
            //         if (err) return res.badRequest(err);
            //         if (!result) return res.forbidden('forbidden');
            //         if (result) {
            //             return next()
            //         }
            //     });

            User.findOne({_id: req.ownerId})
                .populate({path:'myEstablishment', select:"subdomain _id"})
                .select('myEstablishment')
                .exec((err,result)=>{
                    if(err) return res.badRequest(err);
                    if (!result) return res.serverError('Somesing broken');
                    if (result){
                        let isForbidden = true;
                        result.myEstablishment.map(est=>{
                            if(est._id == req.params.id){isForbidden=false}
                        });
                        if(isForbidden){
                            return res.forbidden('forbidden');
                        }else{
                            return next()
                        }

                    }
                })
        }else if(req.body.estId || req.body.id){
            let estid = req.body.id || req.body.estId;
            console.log(estid);
            User.findOne({_id: req.ownerId})
                .populate({path:'myEstablishment', select:"subdomain _id"})
                .select('myEstablishment')
                .exec((err,result)=>{
                    if(err) return res.badRequest(err);
                    if (!result) return res.serverError('Somesing broken');
                    if (result){
                        let isForbidden = true;
                        result.myEstablishment.map(est=>{
                            if(est._id == estid){
                                isForbidden=false
                            }
                        });
                        if(isForbidden){
                            return res.forbidden('forbidden');
                        }else{
                            return next()
                        }
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