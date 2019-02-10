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
                return res.ok({mutual:mutual,id:req.params.FId})
            }
        })
};

// {$and:[{myFriends:{$in: req.params.FId},{myFriends:{$in:req.userId}}}]}