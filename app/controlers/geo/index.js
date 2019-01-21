const mongoose = require('mongoose');
module.exports.get = async (req,res,next)=>{
    let chain = await getChain();
    let est = await getEst(chain);
    res.ok(est);
};

const getEst = chain => {
    return new Promise(async (resolv,reject)=> {
        let est = [];
        await asyncForEach(chain, async (ch) => {
            await asyncForEach(ch.myest, async (c) => {
                let oe = await getEstById(c);
                if (oe){
                    let oneEst = {
                        coordinates: oe.coordinates,
                        _id: oe._id,
                        name: oe.name
                    };
                    oneEst['av'] = ch.av;
                    oneEst['bg'] = ch.bg;
                    oneEst['nameCh'] = ch.name;
                    oneEst['subdomain'] = ch.subdomain;
                    oneEst['thebest'] = ch.thebest;
                    oneEst['favorite'] = ch.favorite;
                    est.push(oneEst);
                }
            });
        });
        resolv(est);
    })
};
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
const getChain =  () => {
    return new Promise((resolv,reject)=>{
        mongoose.model('establishment')
            .find({})
            .where("status==true")
            .populate({path:"bg av"})
            .select("subdomain name thebest favorite bg av myest")
            .exec((err,result)=>{
                if (result) {
                    resolv(result)
                }
            })
    });
};

const getEstById = id =>{
    return new Promise((resolv,reject)=>{
        mongoose.model('oneest')
            .findOne({_id:id})
            .where("status",true)
            .select("coordinates name")
            .exec((err,result)=>{
                if (result) {
                    resolv(result)
                }else{
                    resolv(null)
                }
            })
    });
};