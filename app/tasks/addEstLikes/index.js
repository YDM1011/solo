const mongoose = require('mongoose');
const Establishment = mongoose.model('establishment');
const Post = mongoose.model('post');

module.exports = async (req,res,next) =>{
    let estsId = await findAllEstSelectId().catch(err=>{return res.badRequest(err)});
    if(estsId) setCounts(req,res,estsId);
};

const findAllEstSelectId = ()=>{
    return new Promise((resolve,reject)=>{
        Establishment.find({}).select('_id subdomain').exec((e,r)=>{
            if (r){
                resolve(r)
            }else{
                let err = e || '';
                reject(err)
            }
        })
    })
};

const setCounts = (req,res, estsId)=>{
    asyncForEach(estsId, async (esId) => {
         await Post
            .count({"inPlace.place":esId.subdomain})
            .exec((e,r)=>{
                if (r){
                    let obj = {
                        postCount: r || 0,
                    };
                    Establishment
                        .findOneAndUpdate({_id:esId._id},obj).exec((e,r)=>{})
                }else{
                    let err = e || '';
                }
            })
    });

    asyncForEach(estsId, async (esId) => {
        await Establishment
            .findOne({_id:esId._id})
            .select('favorite thebest myest')
            .exec((e,r)=>{
                if (r){
                    let obj = {
                        favoriteCount: r.favorite ? r.favorite.length : 0,
                        thebestCount: r.thebest ? r.thebest.length : 0,
                        myestCount: r.myest ? r.myest.length : 0
                    };
                    Establishment
                        .findOneAndUpdate({_id:esId._id},obj).exec((e,r)=>{})
                }else{
                    let err = e || '';
                    return res.badRequest(err)
                }
            })
    });
    res.ok("ok");

};

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}