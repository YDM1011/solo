const mongoose = require('mongoose');
const User = mongoose.model('user');
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}
module.exports.getMutual = (req, res, next) => {

    if(req.params.FId == req.userId ){
        return res.ok({id:req.params.FId, mutual:['t']});
    }
    User
        .findOne({_id: req.userId})
        .select("myFriends")
        .exec((err, content) =>{
            if(err) {
                return res.send(err)
            }
            if(!content) {
                return res.ok('not found')
            }
            if (content){
                let Arr = [];
                if (content.myFriends.length < 1) return res.ok({id:req.params.FId, mutual:Arr});

                asyncForEach(content.myFriends, async userId=>{

                    await new Promise((resolve,reject)=>{
                        User
                            .findOne({_id: userId, myFriends:{$in: req.params.FId}})
                            .exec((err, mutual)=>{
                                // if(err) return res.badRequest('Something broke!');
                                if(mutual){
                                    Arr.push(mutual._id);
                                }
                                resolve(userId)
                            })
                    }).then(val=>{
                        console.log('mutual',val);
                        if (val == content.myFriends[content.myFriends.length-1]){
                            return res.ok({id:req.params.FId, mutual:Arr})
                        }
                    })

                });
            }
        });
};
module.exports.getMutualFriends = (req, res, next) => {

    if(req.params.FId == req.userId ){
        return res.ok({id:req.params.FId, mutual:['t']});
    }
    User
        .findOne({_id: req.userId})
        .select("myFriends")
        .exec((err, content) =>{
            if(err) {
                return res.send(err)
            }
            if(!content) {
                return res.ok('not found')
            }
            if (content){
                let Arr = [];
                if (content.myFriends.length < 1) return res.ok({id:req.params.FId, mutual:Arr});

                // asyncForEach(content.myFriends, async userId=>{

                    // await new Promise((resolve,reject)=>{
                    //     User
                    //         .findOne({_id: userId, myFriends:{$in: req.params.FId}})
                    //         .exec((err, mutual)=>{
                    //             // if(err) return res.badRequest('Something broke!');
                    //             if(mutual){
                    //                 Arr.push(mutual);
                    //             }
                    //             resolve(userId)
                    //         })
                    // }).then(val=>{
                    //     console.log('mutual',val);
                    //     if (val == content.myFriends[content.myFriends.length-1]){
                    //         return res.ok(Arr)
                    //     }
                    // })

                // });
                User
                    .find({$and:[
                        {myFriends:{$in: req.params.FId}},
                        {myFriends:{$in: req.userId}}
                    ]})
                    .exec((err, mutual)=>{
                        if(err) return res.badRequest('Something broke!');
                        if(mutual){
                            return res.ok(mutual)
                        }
                    })
            }
        });
};

// {$and:[{myFriends:{$in: req.params.FId},{myFriends:{$in:req.userId}}}]}