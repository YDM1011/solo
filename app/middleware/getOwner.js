const mongoose = require('mongoose');
const glob = require('glob');


glob.getOwner = async (req,res,next)=>{
    require("express");
    require("../responces/serverError")(req, res);
    require("../responces/forbidden")(req, res);
    const Est = mongoose.model('establishment');
    const User = mongoose.model('user');
    if (req.adminLogin == "admin"){
        return next()
    }else {
        console.log("!!!",req.params.id);
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
            let isForbidden = true;
            isForbidden = await checkPerm(req).catch(e=>{console.log(e)});
            if (isForbidden)
            isForbidden = await checkPermByEstId(req).catch(e=>{console.log(e)});
            console.log(isForbidden);
            if(isForbidden === true){
                return res.forbidden('forbidden1');
            }else{
                // req.ownerEst = r.ownerEst || r.ownerest;
                return next()
            }
        }else if(req.body.estId || req.body.id || req.body.ownerest){
            let  bid = null;


            if(req.body.id ){
                bid = req.body.id != req.body._id ? req.body.id : null
            }
            let estid = bid || req.body.estId || req.body.ownerest;
            console.log("2",estid);
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
const checkPerm = req => {
    const User = mongoose.model('user');
    return new Promise((r,e)=>{
        mongoose.model(String(req.erm.model.modelName))
            .findOne({_id:String(req.params.id)})
            .exec( (err,mod)=>{
                if (err) return e(err);
                if (!mod) return e("broken");
                if(mod){
                    User.findOne({_id: req.ownerId})
                        .populate({path:'myEstablishment', select:"subdomain _id"})
                        .select('myEstablishment')
                        .exec((err,result)=>{
                            if(err) return e(err);
                            if (!result) return e('Somesing broken');
                            if (result){
                                result.myEstablishment.map(est=>{
                                    if(String(est._id) == String(mod.ownerEst) || String(est._id) == String(mod.ownerest))
                                    {return r(false)}
                                });
                                return r(true)
                            }
                        })
                }
            });

    })
};
const checkPermByEstId = req =>{
    const User = mongoose.model('user');
    return new Promise((r,e)=>{
        User.findOne({_id: req.ownerId, myEstablishment:{$in:req.params.id}})
            .populate({path:'myEstablishment', select:"subdomain _id"})
            .select('myEstablishment')
            .exec((err,result)=>{
                if(err) return e(err);
                if (!result) return r(true);
                if (result) return r(false);
            });
    })
};