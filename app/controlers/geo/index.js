const mongoose = require('mongoose');
module.exports.get = async (req,res,next)=>{
    // let chain = await getChain();
    // let est = await getEst(chain);
    let est = await getEsts();
    res.ok(est);
};
module.exports.get1 = async (req,res,next)=>{
    let chain = await r1();
    let r = await r2(chain);
    res.ok(r);
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
            .exec((err,result)=>{
                if (result) {
                    resolv(result)
                }else{
                    resolv(null)
                }
            })
    });
};

const getEsts = () =>{
    return new Promise((resolv,reject)=>{
        mongoose.model('oneest')
            .find({})
            .populate({path:'ownerEst', populate:{path: "bg av"}})
            .exec((err,result)=>{
                if (result) {
                    resolv(result)
                }else{
                    resolv(null)
                }
            })
    });
};

const uEstById = (id, ie) =>{
    return new Promise((resolv,reject)=>{
        mongoose.model('oneest')
            .findOneAndUpdate({_id:id},{ownerEst:ie})
            .exec((err,result)=>{
                if (result) {
                    resolv(result)
                }else{
                    resolv(null)
                }
            })
    });
};
const uEst = (id, arr) =>{
    return new Promise((resolv,reject)=>{
        mongoose.model('establishment')
            .findOneAndUpdate({_id:id},{myest:arr})
            .exec((err,result)=>{
                if (result) {
                    resolv(result)
                }else{
                    resolv(null)
                }
            })
    });
};

const r1 = ()=>{
    return new Promise((resolv,reject)=>{
        mongoose.model('establishment')
            .find({})
            .select("myest")
            .exec((err,result)=>{
                if (result) {
                    resolv(result)
                }
            })
    });
};

const r2 = chain =>{
    return new Promise(async (resolv,reject)=>{
        await asyncForEach(chain, async (ch) => {
            let newMyEst = [];
            await asyncForEach(ch.myest, async (c) => {

                let oe = await getEstById(c);
                if (oe){
                    await uEstById(oe._id, ch._id);
                    newMyEst.push(oe._id);
                }

            });
            uEst(ch._id, newMyEst)
        });
        resolv("ok!")
    });
};