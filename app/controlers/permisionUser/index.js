const mongoose = require('mongoose');
const User = mongoose.model('user');
const Ests = mongoose.model('establishment');

module.exports = (req,res,next)=>{
    if (req.body.$pull){
        User
            .findOneAndUpdate({_id: req.params.id},req.body, {new: true})
            .exec((err, info) => {
                if(err) return res.badRequest(err);
                if(!info) return res.notFound('You are not valid1');
                Ests
                    .findOneAndUpdate({_id: req.body.$pull.myEstablishment},
                        {$pull:{permisions:req.params.id}}, {new: true})
                    .populate({path:"permisions",select:"firstName lastName"})
                    .select("subdomain name verify _id permisions")
                    .exec((err, infoEst) => {
                        return res.ok(infoEst)
                    });

            });
    }else{
        User.findOne({_id: req.params.id, myEstablishment:{$in:req.body.estId}})
            .exec((err,result)=>{
                if(err) return res.badRequest(err);
                if(result) return res.ok('You are not valid2');
                if(!result){
                    User
                        .findOneAndUpdate({_id: req.params.id},{$push:{myEstablishment:req.body.estId}},
                            {new: true})
                        .exec((err, info) => {
                            if(err) return res.badRequest(err);
                            if(!info) return res.notFound('You are not valid3');
                            Ests.findOne({_id: req.body.estId, permisions:{$in:req.params.id}})
                                .exec((err,result)=>{
                                    // if(err) return res.badRequest(err);
                                    // if(result) return res.notFound('You are not valid');
                                    if(!result){
                                        Ests
                                            .findOneAndUpdate({_id: req.body.estId},
                                                {$push:{permisions:req.params.id}}, {new: true})
                                            .populate({path:"permisions",select:"firstName lastName"})
                                            .select("subdomain name verify _id permisions")
                                            .exec((err, infoEst) => {
                                                return res.ok(infoEst)
                                            });
                                    }
                                })

                        });
                }
            })
    }
    // if (req.body.$pull){
    //     Ests
    //         .findOneAndUpdate({_id: req.body.estId},{$pull:{permisions:req.params.id}}, {new: true})
    //         .exec((err, info) => {
    //             // if(err) return res.badRequest(err);
    //             // if(!info) return res.notFound('You are not valid');
    //             // return res.ok(info)
    //         });
    // }else{
    //     Ests.findOne({_id: req.body.estId, permisions:{$in:req.params.id}})
    //         .exec((err,result)=>{
    //             // if(err) return res.badRequest(err);
    //             // if(result) return res.notFound('You are not valid');
    //             if(!result){
    //                 Ests
    //                     .findOneAndUpdate({_id: req.body.estId},{$push:{permisions:req.params.id}} , {new: true})
    //                     .exec((err, info) => {
    //                         // if(err) return res.badRequest(err);
    //                         // if(!info) return res.notFound('You are not valid');
    //                         // return res.ok(info)
    //                     });
    //             }
    //         })
    // }

};