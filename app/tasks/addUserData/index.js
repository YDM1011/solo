const mongoose = require('mongoose');
const User = mongoose.model('user');
const Category = mongoose.model('category');

module.exports = async (req,res,next) =>{
    let users = await findAllUser().catch(err=>{return res.badRequest(err)});
    let categ = await updateUserData(users, req).catch(err=>{return res.badRequest(err)});
    res.ok(categ)
};

const findAllUser = ()=>{
    return new Promise((resolve,reject)=>{
        User.find({}).select('_id data').exec((e,r)=>{
            if (r){
                resolve(r)
            }else{
                let err = e || '';
                reject(err)
            }
        })
    })
};

const updateUserData = (users, req)=>{
    return new Promise(async (resolve,reject)=>{
        if (users)
            await asyncForEach(users, async (us)=>{
                await updateData(us)
            });

        resolve(users)
    })
};

const updateData = us =>{
    return new Promise((rs,rj)=>{
        User.findOne({_id:us._id}).select('_id data').select('_id data').exec((err,is)=>{
            if (is){
                if (!is.data && !err){
                    User.findOneAndUpdate({_id:us._id},
                        {data:"2019-03-01T10:00:00.000Z"}, {new: true})
                        .select('_id data').exec((e,r)=>{
                        if (r){
                            rs(r)
                        }else{
                            let err = e || '';
                            rj(err)
                        }
                    })
                }
            }
        });
    })

};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}