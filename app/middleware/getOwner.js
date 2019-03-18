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
            // console.log(req.erm.model.modelName);
            mongoose.model(req.erm.model.modelName)
                .findOne({_id:req.params.id})
                .exec((e,r)=>{
                    if (e || !r) return res.serverError();
                    if(r){
                        // console.log(r);
                        User.findOne({_id: req.ownerId})
                            .populate({path:'myEstablishment', select:"subdomain _id"})
                            .select('myEstablishment')
                            .exec((err,result)=>{
                                if(err) return res.badRequest(err);
                                if (!result) return res.serverError('Somesing broken');
                                if (result){
                                    let isForbidden = true;
                                    result.myEstablishment.map(est=>{
                                        if(String(est._id) == String(r.ownerEst) || String(est._id) == String(r.ownerest))
                                        {isForbidden=false}
                                    });
                                    if(isForbidden){
                                        return res.forbidden('forbidden1');
                                    }else{
                                        return next()
                                    }
                                }
                            })
                    }
                });

        }else if(req.body.estId || req.body.id || req.body.ownerest){
            let  bid = null;
            if(req.body.id ){
                bid = req.body.id != req.body._id ? req.body.id : null
            }
            let estid = bid || req.body.estId || req.body.ownerest;
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