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

                asyncForEach(content.myFriends, async userId=>{

                    await new Promise((resolve,reject)=>{
                        User
                            .findOne({_id: userId, myFriends:{$in: req.params.FId}})
                            .exec((err, mutual)=>{
                                // if(err) return res.badRequest('Something broke!');
                                if(mutual){
                                    Arr.push(mutual);
                                }
                                resolve(userId)
                            })
                    }).then(val=>{
                        console.log('mutual',val);
                        if (val == content.myFriends[content.myFriends.length-1]){
                            return res.ok(Arr)
                        }
                    })

                });
            }
        });
};
// module.exports.getMutualFriends = (req, res, next) => {
//     // populate:{path:"photo bg", select:"preload _id"}
//     let myId = myid || req.userId;
//     let usId = usid || req.body.userId;
//     if (myId==usId){
//         return res.ok([]);
//     }
//     User
//         .findOne({_id: myId})
//         .select("myFriends")
//         .exec((err, content) =>{
//             if(err) {
//                 return res.badRequest(err);
//             }
//             if(!content){
//                 return res.badRequest()
//             }
//             if(content){
//                 User
//                     .findOne({_id: usId})
//                     .select("myFriends")
//                     .exec((err, content) =>{
//                         if(err) {
//                             return res.badRequest(err);
//                         }
//                         if(!content){
//                             return res.badRequest()
//                         }
//                         if(content){
//                             return res.ok(content)
//                         }
//                     });
//             }
//         });
// };