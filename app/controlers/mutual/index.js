const mongoose = require('mongoose');
const User = mongoose.model('user');
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}
module.exports.getMutualFriends = (req, res, next) => {

    if(req.params.FId == req.userId ){
        return res.ok({id:req.params.FId, mutual:['t']});
    }
    User
        .find({$and:[
                {myFriends:{$in: req.params.FId}},
                {myFriends:{$in: req.userId}}
            ]})
        .populate({path:"photo"})
        .exec((err, mutual)=>{
            if(err) return res.badRequest('Something broke!');
            if(mutual){
                return res.ok(mutual)
            }
        })
};
module.exports.getMutual = (req, res, next) => {

    if(req.params.FId == req.userId ){
        return res.ok({id:req.params.FId, mutual:['t']});
    }
    User
        .find({$and:[
                {myFriends:{$in: req.params.FId}},
                {myFriends:{$in: req.userId}}
            ]}).select("_id")
        .exec((err, mutual)=>{
            if(err) return res.badRequest('Something broke!');
            if(mutual){
                User
                    .findOne({_id:req.params.FId}).select("_id choiceest")
                    .exec((err, us)=>{
                        if(err) return res.badRequest('Something broke!');
                        if(us){
                            console.log(us);
                            let query = [];
                            if(us.choiceest){
                                us.choiceest.map(it=>{
                                    query.push({choiceest:{$in: it}})
                                });
                                console.log("query",us.choiceest    );
                                if (query){
                                    User
                                        .findOne({_id:req.userId})
                                        .populate({path: "choiceest", select:"_id", match:{_id:us.choiceest}})
                                        .select("_id choiceest")
                                        .exec((err, est)=>{
                                            if(err) return res.badRequest('Something broke!1');
                                            if(est){
                                                return res.ok({mutual:mutual,id:req.params.FId,mutualEst:est.choiceest})
                                            }
                                            if(!est){
                                                return res.ok({mutual:mutual,id:req.params.FId,mutualEst:[]})
                                            }
                                        })
                                }else{
                                    return res.ok({mutual:mutual,id:req.params.FId,mutualEst:[]})
                                }
                            }else{
                                return res.ok({mutual:mutual,id:req.params.FId,mutualEst:[]})
                            }

                        }
                    })

            }
        })

};

// {$and:[{myFriends:{$in: req.params.FId},{myFriends:{$in:req.userId}}}]}