const mongoose = require('mongoose');
const User = mongoose.model('user');
module.exports.getMutual = (req, res, next) => {

    if(req.params.FId == req.userId){
        return res.ok();
    }
    User
        .findOne({_id: req.params.FId})
        .select("myFriends")
        .exec((err, content) =>{
            if(err) {
                return res.send(err)
            }
            if(!content) {
                return res.ok('not found')
            }
            if (content){

                new Promise((resolve, reject)=>{
                    let Arr = [];
                    if (content.myFriends.length < 1) resolve(Arr);
                    content.myFriends.forEach(userId=>{
                        User
                            .findOne({_id: userId, myFriends:{$in: req.userId}})
                            .exec((err, mutual)=>{
                                console.log(mutual);
                            // if(err) return res.badRequest('Something broke!');
                            if(mutual){
                                Arr.push(mutual._id);
                            }
                            if (userId == content.myFriends[content.myFriends.length-1]){
                                resolve(Arr)
                            }
                        })
                    });
                }).then(val=>{
                    return res.ok(val)
                });
            }
        });
};