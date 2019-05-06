const mongoose = require('mongoose');
const glob = require('glob');


glob.isByAdmin = async (req,res,next)=>{
    require("express");
    require("../responces/serverError")(req, res);
    require("../responces/forbidden")(req, res);
    const Est = mongoose.model('establishment');
    const User = mongoose.model('user');
    if (req.adminLogin == "admin"){
        req.isUseByAdmin = true;
        return next()
    }else {
        if (req.params.id) {
            let isForbidden = true;
            isForbidden = await checkPerm(req, next).catch(e=>{console.log(e)});
            console.log(isForbidden);
            if (isForbidden)
            isForbidden = await checkPermByEstId(req).catch(e=>{console.log(e)});
            if(isForbidden === true){
                // if (await checkUserPermision(req)) return next();
                return res.forbidden('forbidden1');
            }else{
                // req.ownerEst = r.ownerEst || r.ownerest;
                req.isUseByAdmin = true;
                return next()
            }
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
                            req.isUseByAdmin = true;
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
const checkPerm = (req, next) => {
    const User = mongoose.model('user');
    return new Promise((r,e)=>{
        mongoose.model(String(req.erm.model.modelName))
            .findOne({_id:String(req.params.id)})
            .exec( (err,mod)=>{
                if (err) return e(err);
                if (!mod) return e("broken");
                if(mod){
                    mongoose.model(req.erm.model.modelName)
                        .findOne({_id:req.params.id, owneruser: req.userId})
                        .exec((e,rsl)=>{
                            if (e) return res.serverError(e);
                            if (!rsl){
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
                            if (rsl) return next()
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

const checkUserPermision = req =>{
    return new Promise((r,e)=>{
        console.log(String(req.erm.model.modelName));
        mongoose.model(String(req.erm.model.modelName))
            .findOne({owneruser:req.userId})
            .exec( (err,mod)=>{
                if (err) return e(err);
                if (!mod) return r(false);
                if(mod){
                    return r(true)
                }
            });
    })
};